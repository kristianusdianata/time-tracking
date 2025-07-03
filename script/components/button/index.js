// @ts-check

import { withElement } from "../../utils/index.js";

/**
 * Membuat sebuah `button` element berdasarkan argumen yang diberikan
 *
 * @param {object} options
 * @param {string[]} options.classNames - Button class name
 * @param {string} options.label - Button text label
 * @param {Object.<string, string>} [options.attributes] - Optional button atribut
 * @param {{event: string, callbackFn: (e:Event) => void}} [options.eventListener] - Optional event listener dimana argumen `event` adalah jenis event seperti `onclick` dan `callbackFn` adalah function yang akan dijalankan ketika event ke trigger
 * @returns {HTMLButtonElement} HTML button element
 * @example
 *
 * // Create primary button
 * const primaryBtn = button({
 *  className: "primary",
 *  label: "Button",
 *  attributes: {
 *    "data-index" : "2"
 *  },
 *  eventListener: {
 *    event: "click",
 *    callbackFn: (e) => {
 *      e.preventDefault()
 *      console.log("Button clicked!");
 *    }
 *  }
 * })
 *
 * // Sample output  di HTML:
 * // <button class="primary" data-index="2">Button</button>
 *
 * // Sample console output ketika button di klik:
 * // "Button clicked!"
 */
export function button({
  classNames,
  label,
  attributes = {},
  eventListener = undefined,
}) {
  /**
   *  @function
   *  @type {ReturnType<typeof withElement>}
   */
  const buttonFn = withElement("button")
    .setInnerText(label)
    .setClass(classNames);

  if (Object.keys(attributes).length > 0) {
    buttonFn.setAttribute(attributes);
  }

  if (eventListener) {
    const { event, callbackFn } = eventListener;

    buttonFn.setEventHandler(event, callbackFn).build();
  }

  return /** @type {HTMLButtonElement} */ (buttonFn.build());
}
