// @ts-check

import {
  withElement,
  loopHandler,
  toCamelCase,
  withAssert,
} from "../../utils/index.js";
import { button } from "../../components/index.js";

/**
 * Function yang digunakan untuk membuat sebuah list menu profile
 *
 * @function
 * @param {string[]} timeFrames -  Data array timeframe.
 * @param {(e: Event) => void} onClickFn - Function yang akan dijalankan ketika menu item button di klik.
 * @param {(liElement: HTMLLIElement, ulElement: HTMLUListElement, index: number, timeframe: string) => void} updateStateFn - Callback function yang akan menghandle update data state setelah menu item berhasil dibuat.
 * @returns {HTMLUListElement} List menu profile
 */
export function listMenu(timeFrames, onClickFn, updateStateFn) {
  /**
   * @constant
   * @type {HTMLUListElement}
   */
  const ul = /** @type {HTMLUListElement} */ (
    withElement("ul").setClass(["profile__menu-group"]).build()
  );

  /**
   * @function
   * @type {(val: string | number) => number}
   */
  const assertNumber = withAssert((val) => typeof val === "number");

  loopHandler(timeFrames, (timeframe, index) => {
    /** Set active class  */
    const activeClassName = assertNumber(index) === 0 ? "is-active" : "";
    const menuButton = button({
      classNames: [`profile__menu-button`, `${activeClassName}`],
      label: toCamelCase(timeframe),
      attributes: {
        type: "button",
        "data-index": `${index}`,
      },
      eventListener: {
        event: "click",
        callbackFn: onClickFn,
      },
    });

    /**  @type {HTMLLIElement} */
    const li = /** @type {HTMLLIElement} */ (
      withElement("li").setClass(["profile__menu-item"]).build()
    );

    li.appendChild(menuButton);
    updateStateFn(li, ul, assertNumber(index), timeframe);
  });

  return ul;
}
