import { toCamelCase } from "../utils.js";
import { data } from "../handler/index.js";

export async function time() {
  const container = document.querySelector(".container-card");
  const timeLabels = [];
  const timeDescLabels = [];

  const timeData = await data();

  function generateDescText($timeframe) {
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

  function generateBlockName(title) {
    return title.toLowerCase().replace(" ", "-");
  }

  function component(title, dataByTimeFrame, activeMenuText) {
    const blockName = generateBlockName(title);
    const { current, previous } = dataByTimeFrame;

    return `
      <section class="${blockName}">
        <div class="${blockName}__wrapper">
          <header class="${blockName}__header">
            <h2 class="${blockName}__title">${toCamelCase(title)}</h2>
            <button type="button" aria-label="menu">
              <ion-icon
                class="${blockName}__icon"
                name="ellipsis-horizontal"
                aria-hidden="true"
              ></ion-icon>
            </button>
          </header>

          <div class="${blockName}__body">
            <time datetime="PT${current}H" class="${blockName}__time">${current}hrs</time>
            <span class="${blockName}__desc">${generateDescText(
      activeMenuText
    )} - ${previous}hrs</span>
          </div>
        </div>
      </section>
    `;
  }

  function clearAllContents() {
    while (container.children.length > 1) {
      container.removeChild(container.lastElementChild);
    }
  }

  function generateContent(activeMenuText) {
    const titles = timeData.getTitle();
    const activeMenuLowerCase = activeMenuText.toLowerCase();

    clearAllContents();

    titles.forEach((title) => {
      const titleLowerCase = title.toLowerCase();

      const dataByTimeFrame = timeData.getDataByTimeFrame(
        titleLowerCase,
        activeMenuLowerCase
      );

      const content = component(
        titleLowerCase,
        dataByTimeFrame,
        activeMenuLowerCase
      );

      container.insertAdjacentHTML("beforeend", content);

      const blockName = generateBlockName(title);
      timeLabels.push(container.querySelector(`.${blockName}__time`));
      timeDescLabels.push(container.querySelector(`.${blockName}__desc`));
    });
  }

  function updateLabelContents(activeMenuText) {
    const titles = timeData.getTitle();
    const activeMenuLowerCase = activeMenuText.toLowerCase();

    titles.forEach((title, index) => {
      const titleLowerCase = title.toLowerCase();

      const { current, previous } = timeData.getDataByTimeFrame(
        titleLowerCase,
        activeMenuLowerCase
      );

      timeLabels[index].setAttribute("datetime", `PT${current}H`);
      timeLabels[index].innerHTML = `${current}hrs`;
      timeDescLabels[index].innerHTML = `${generateDescText(
        activeMenuLowerCase
      )} - ${previous}hrs`;
    });
  }

  return {
    generateContent,
    updateLabelContents,
  };
}
