import { data } from "../handler/index.js";
import { toCamelCase } from "../utils.js";

export async function menu() {
  const menu = document.querySelector(".profile__menu");
  let menuButtons = null;
  const menuData = await data();
  const activeClass = "is-active";

  function callbackMenu(callback) {
    if (menuButtons && callback) callback();
  }

  function component(isActive, title) {
    return `
      <li class="profile__menu-item">
        <button class="profile__menu-button ${isActive}" type="button">
          ${title}
        </button>
      </li>
    `;
  }

  function generateContent(callbackTimeContent) {
    const timeframekeys = menuData.getTimeFrameKeys();
    let listContent = [];

    timeframekeys.forEach((timeframekey, index) => {
      const defaultActive = index === 0 ? activeClass : "";
      const title = toCamelCase(timeframekey);

      listContent.push(component(defaultActive, title));
    });

    const groupMenu = `
    <ul class="profile__menu-group">
      ${listContent.join("")}
    </ul>`;

    menu.insertAdjacentHTML("afterbegin", groupMenu);
    menuButtons = menu.querySelectorAll(".profile__menu-button");

    // generate card content
    const activeMenuText = getActiveMenu().innerText.toString().toLowerCase();
    callbackTimeContent(activeMenuText);
  }

  function getActiveMenu() {
    return Array.from(menuButtons).find((menuButton) =>
      menuButton.classList.contains(activeClass)
    );
  }

  function activeMenuHandler(menuButton, callbackUpdateTime) {
    if (menuButton.classList.contains(activeClass)) return;

    const activeMenuElement = getActiveMenu();
    activeMenuElement.classList.remove(activeClass);

    menuButton.classList.add(activeClass);
    const activeMenuText = menuButton.innerText.toString().toLowerCase();
    callbackUpdateTime(activeMenuText);
  }

  function setActiveMenu(callbackUpdateTime) {
    callbackMenu(() => {
      menuButtons.forEach((menuButton) => {
        menuButton.addEventListener("click", function (e) {
          e.preventDefault();
          activeMenuHandler(menuButton, callbackUpdateTime);
        });
      });
    });
  }

  return {
    generateContent,
    setActiveMenu,
  };
}
