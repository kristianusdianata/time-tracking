// @ts-check

import { dataTimeQuery } from "../../data.js";
import { withState, withElement } from "../../utils/index.js";
import { MenuItemState } from "./menuItemState.js";
import { listMenu } from "./listMenuComponents.js";
import { onClickHandler } from "./eventHandler.js";
import { appendCard, updateCardText } from "../time/index.js";

/** @function */
export function main() {
  /**
   * @function
   * @type {ReturnType<typeof withState<MenuItemState>>}
   */
  const stateFn = withState(MenuItemState);

  /**
   * @constant
   * @type {HTMLElement | null}
   */
  const profileMenu = document.querySelector(".profile__menu");

  /**
   * @constant
   * @type {string[]}
   */
  const timeframes = dataTimeQuery.getKeys("timeframes");

  /**
   * @function
   * @type {(currIndex: number, activeIndex: number) => void}
   */
  const modifClassInMenuItemState = (currIndex, activeIndex) => {
    stateFn.runPipeline([
      /** Step 1 */
      function removeOldActiveClass(listMenuItems, _unusedIndex, _unusedApi) {
        withElement(
          /** @type {HTMLButtonElement} */ (
            listMenuItems[activeIndex].element.querySelector(
              `button[type="button"]`
            )
          )
        )
          .modifClass("remove", ["is-active"])
          .build();
      },
      /** Step 2 */
      function setNewActiveClass(listMenuItems, _index, _api) {
        withElement(
          /** @type {HTMLButtonElement} */ (
            listMenuItems[currIndex].element.querySelector(
              `button[type="button"]`
            )
          )
        )
          .modifClass("add", ["is-active"])
          .build();
      },
      /** Step 3 */
      function updateStateIndex(_listMenuItems, _index, { updateIndex }) {
        updateIndex(currIndex);
      },
      /** Step 4 */
      function updateCard(listMenuItems, index, _api) {
        updateCardText(listMenuItems[index].timeframe);
      },
    ]);
  };

  /**
   * @function
   * @type {(liElement: HTMLLIElement, ulElement: HTMLUListElement, index: number, timeframe: string) => void}
   */
  const addMenuItemIntoState = (liElement, ulElement, index, timeframe) => {
    stateFn.runPipeline([
      /** Step 1 */
      function addItem(_listMenuItems, _index, { addItem }) {
        addItem({
          timeframe,
          element: liElement,
        });
      },
      /** Step 2 */
      function appendItemToUl(listMenuItems, _) {
        ulElement.insertAdjacentElement(
          "beforeend",
          listMenuItems[index].element
        );
      },
      /** Step 3 */
      function appendCardToDOM(listMenuItems, index, _api) {
        appendCard(listMenuItems[index].timeframe.toLowerCase());
      },
    ]);
  };

  /**
   * @constant
   * @type {HTMLUListElement}
   */
  const menuElement = listMenu(
    timeframes,
    function onClickFn(event) {
      event.preventDefault();
      onClickHandler(event, stateFn.getIndex(), (currIndex, activeIndex) =>
        modifClassInMenuItemState(currIndex, activeIndex)
      );
    },
    (liElement, ulElement, index, timeframe) =>
      addMenuItemIntoState(liElement, ulElement, index, timeframe)
  );

  if (profileMenu) profileMenu.insertAdjacentElement("afterbegin", menuElement);
}
