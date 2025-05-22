import { getTimeFrameKey } from "../data.js";
import { toCamelCase } from "../utils.js";
import { updateCardContent } from "./card.js";

const header_body = document.querySelector(".card.card--profile .body");
let header_nav = null;

export async function generateListContent() {
  const timeframekeys = await getTimeFrameKey();

  let list_content = [];

  // fetch timeframes into list
  timeframekeys.forEach((timeframekey, index) => {
    const defaultActive = index === 0 ? "active" : "";
    const title = toCamelCase(timeframekey);

    list_content.push(`
      <li>
        <button
          class="text-list text-list--normal text-purple-500 text-white--hover text-white--active ${defaultActive}"
          href="#"
          >${title}</button
        >
      </li>  
    `);
  });

  // create list_menu
  const list_menu = `
    <ul class="list-menu">
      ${list_content.join("")}
    </ul>
  `;

  // insert list_menu to header_body
  header_body.insertAdjacentHTML("afterbegin", list_menu);
  header_nav = header_body.querySelectorAll("ul.list-menu li button");
}

export function getActiveMenu() {
  if (!header_nav) return null;

  const active_menu = Array.from(header_nav).find((nav) =>
    nav.classList.contains("active")
  );

  if (!active_menu) return null;
  return active_menu;
}

export async function setActiveMenu() {
  if (!header_nav) return null;

  header_nav.forEach((nav) => {
    nav.addEventListener("click", async (e) => {
      e.preventDefault();

      if (nav.classList.contains("active")) return;

      // remove active class
      const active_menu = getActiveMenu();
      active_menu.classList.remove("active");

      // set active class
      nav.classList.add("active");

      // update body card content
      const current_active = nav.innerHTML.toString().toLowerCase();
      await updateCardContent(current_active);
    });
  });
}
