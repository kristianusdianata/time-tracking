import { getTitle, getTimeFrames } from "../data.js";
import { getActiveMenu } from "./list.js";

const card_container = document.querySelector(".container-card");
let bodyText = [];
let bodyMutedText = [];

function generateText($timeframe) {
  switch ($timeframe.toLowerCase()) {
    case "daily": {
      return "Yesterday";
    }
    case "weekly": {
      return "Last Week";
    }
    case "monthly": {
      return "Last Month";
    }
    default: {
      return "";
    }
  }
}

function generateClass($titleIndex) {
  const backgroundClass = [
    "bg-orange-300",
    "bg-blue-300",
    "bg-pink-400",
    "bg-green-400",
    "bg-purple-700",
    "bg-yellow-300",
  ];

  return {
    backgroundColor: backgroundClass[$titleIndex],
  };
}

function generateId($title) {
  return $title.toLowerCase().replace(" ", "-");
}

function clearAllCardContent() {
  while (card_container.children.length > 1) {
    card_container.removeChild(card_container.lastElementChild);
  }
}

export async function generateCardContent() {
  const titles = await getTitle();
  const active_menu = getActiveMenu().innerHTML.toString();

  // remove all card content
  clearAllCardContent();

  titles.forEach(async (title, index) => {
    const timeframe = await getTimeFrames(title, active_menu);
    const generatedId = generateId(title);
    const classes = generateClass(index);
    const backgroundColor = classes.backgroundColor;

    // Create html using dynamic data
    const card_content = `
        <section class="card card--content ${backgroundColor}" id=${generatedId}>
            <div class="wrapper-content bg-navy-900 bg-navy-500--hover">
              <div class="header">
                <h2 class="white">${title}</h2>
                <button type="button" aria-label="menu">
                  <ion-icon
                    class="navy-200"
                    name="ellipsis-horizontal"
                    aria-hidden="true"
                  ></ion-icon>
                </button>
              </div>
              <div class="body">
                <time
                  datetime="PT${timeframe.current}H"
                  class="text-highlight font-light white flex-basis-100--sm flex-basis-50"
                  >${timeframe.current}hrs</time
                >
                <span
                  class="text-muted font-normal navy-200 flex-basis-100--sm flex-basis-50 text-end text-start--sm"
                  >${generateText(active_menu)} - ${
      timeframe.previous
    }hrs</span>
              </div>
            </div>
          </section>
      `;

    // insert card_content to card_container
    card_container.insertAdjacentHTML("beforeend", card_content);
    bodyText.push(
      document.querySelector(
        `.card.card--content#${generatedId} .wrapper-content .body time`
      )
    );

    bodyMutedText.push(
      document.querySelector(
        `.card.card--content#${generatedId} .wrapper-content .body span.text-muted`
      )
    );
  });
}

export async function updateCardContent($active_menu) {
  if (!bodyText && !bodyMutedText) return;

  const titles = await getTitle();

  titles.forEach(async (title, index) => {
    const timeframe = await getTimeFrames(title, $active_menu);

    // update body content
    bodyText[index].setAttribute("datetime", `PT${timeframe.current}H`);
    bodyText[index].innerHTML = `${timeframe.current}hrs`;
    bodyMutedText[index].innerHTML = `${generateText($active_menu)} - ${
      timeframe.previous
    }hrs`;
  });
}
