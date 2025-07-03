// @ts-check

import { loopHandler } from "./utilities.js";

/**
 * @template {HTMLElement} T
 * @typedef {Object} ElementChain
 * @property {(classNames: string[]) => ElementChain<T>} setClass - API chain yang bertugas untuk memberikan class ke element yang bersangkutan.
 * @property {(action: "add" | "remove" ,classNames: string[]) => ElementChain<T>} modifClass - API chain yang bertugas untuk memodifikasi class (add / remove) ke element yang bersangkutan.
 * @property {(text: string) => ElementChain<T>} setInnerText - API chain yang bertugas untuk memberikan text ke element yang bersangkutan.
 * @property {(attributes: Object.<string, string>) => ElementChain<T>} setAttribute - API chain yang bertugas untuk memberikan attribute ke element yang bersangkutan.
 * @property {(event: string, callbackFn: (e:Event) => void) => ElementChain<T>} setEventHandler - API chain yang bertugas untuk memberikan event listener ke element yang bersangkutan.
 * @property {() => T} build - API yang mengembalikan element.
 * @property {(attrName: string) => string} getAttribute - API yang mengembalikan data `attribute` berdasarkan argument yang di berikan.
 */

/**
 * Reusable wrapper yang bertugas untuk membuat / memodifikasi sebuah element.
 * Wrapper ini bisa di chain sesuai dengan kebutuhan.
 *
 * @template {HTMLElement} T
 * @function
 * @param {T | string} param - Berikan `HTMLElement` jika ingin melakukan modifikasi class / attribute, dan berikan `string` jika ingin membuat element baru
 * @returns {ElementChain<T>} API chain.
 * @example
 *
 * // Membuat element <button> dengan class, text, and click handler
 * let btn = withElement("button")
 *   .setClass("primary-btn")
 *   .setInnerText("Click Me")
 *   .setAttribute({ type: "button" })
 *   .setEventHandler("click", () => alert("Button clicked"))
 *   .build();
 *
 * console.log(btn); // <button class="primary-btn" type="button">Click Me</button>
 *
 * // Modif element class
 * btn = withElement(btn).modifClass("remove", "primary-btn").build();
 * console.log(btn); // <button type="button">Click Me</button>
 */

export function withElement(param) {
  /** @type {T} */
  const element =
    typeof param === "string"
      ? /** @type {T} */ (document.createElement(`${param}`))
      : param;

  if (!element) throw new Error("Targeted element not found");

  return {
    setClass(classNames) {
      element.classList.add(...classNames.filter(Boolean));
      return withElement(element);
    },
    modifClass(action, classNames) {
      /** @type {string[]} */
      const validClasses = classNames.filter(Boolean);

      switch (action) {
        case "add":
          if (validClasses.every((cls) => !element.classList.contains(cls))) {
            element.classList.add(...validClasses);
          }
          break;
        case "remove":
          if (validClasses.some((cls) => element.classList.contains(cls))) {
            element.classList.remove(...validClasses);
          }
          break;
        default:
          throw new Error(`Unsupported action: ${action}`);
      }
      return withElement(element);
    },
    setInnerText(text) {
      element.innerText = text;
      return withElement(element);
    },
    setAttribute(attributes) {
      loopHandler(attributes, (value, key) => {
        element.setAttribute(key.toString(), value);
      });

      return withElement(element);
    },
    setEventHandler(event, callbackFn) {
      element.addEventListener(event, callbackFn);
      return withElement(element);
    },
    build() {
      return element;
    },
    getAttribute(attrName) {
      /** @type {string | null} */
      const data = element.getAttribute(attrName);

      if (data) return data;
      else return "";
    },
  };
}
