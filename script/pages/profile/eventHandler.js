// @ts-check

import { withAssert, withElement } from "../../utils/index.js";

/**
 * Function yang digunakan sebagai onClick handler pada menu item button
 *
 * @function
 * @param {Event} event - Jenis event seperti `click`
 * @param {number} activeIndex - Data state Index dari menu item yang sedang aktif
 * @param {(currIndex: number, activeIndex: number) => void} updateStateFn - Callback function yang akan menghandle update data state pada saat event di menu item button dijalankan.
 * @returns {void}
 */
export function onClickHandler(event, activeIndex, updateStateFn) {
  /**
   * @function
   * @type {<T>(target: T | null) => T}
   */
  const withAssertDefined = withAssert((target) => target !== null);

  /** @type {EventTarget} */
  const currTarget = withAssertDefined(event.target);

  if (currTarget instanceof HTMLElement) {
    const currElement = withElement(currTarget);
    const currElementIndex = Number(currElement.getAttribute("data-index"));

    if (currElementIndex === activeIndex) return;
    updateStateFn(currElementIndex, activeIndex);
  }
}
