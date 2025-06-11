import { data } from "../handler/index.js";
import { toCamelCase } from "../utils.js";

export async function menu() {
  const menu = document.querySelector(".profile__menu");
  let menuButtonList = null;
  const menuData = await data();
  const activeClass = "is-active";

  function callback(menuButtonList, callback) {
    if (menuButtonList && callback) callback(menuButtonList);
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
    menuButtonList = menu.querySelectorAll(".profile__menu-button");

    callback(menuButtonList, (menuButtonList) => {
      // generate card content
      const activeMenu = getActiveMenu(menuButtonList);
      const activeMenuText = activeMenu.innerText.toString().toLowerCase();
      callbackTimeContent(activeMenuText);
    });
  }

  function getActiveMenu(menuButtonList) {
    return Array.from(menuButtonList).find((menuButton) =>
      menuButton.classList.contains(activeClass)
    );
  }

  function activeMenuHandler(menuButtonList, menuButton, callbackUpdateTime) {
    if (menuButton.classList.contains(activeClass)) return;

    const activeMenuElement = getActiveMenu(menuButtonList);
    activeMenuElement.classList.remove(activeClass);

    menuButton.classList.add(activeClass);
    const activeMenuText = menuButton.innerText.toString().toLowerCase();
    callbackUpdateTime(activeMenuText);
  }

  function setActiveMenu(callbackUpdateTime) {
    callback(menuButtonList, (menuButtonList) => {
      menuButtonList.forEach((menuButton) => {
        menuButton.addEventListener("click", function (e) {
          e.preventDefault();
          activeMenuHandler(menuButtonList, menuButton, callbackUpdateTime);
        });
      });
    });
  }

  return {
    generateContent,
    setActiveMenu,
  };
}
