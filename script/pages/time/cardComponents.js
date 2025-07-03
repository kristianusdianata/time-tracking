// @ts-check

import { toCamelCase, withElement } from "../../utils/index.js";
import { button } from "../../components/index.js";
import { createDescText } from "./utils.js";

/**
 * Function yang digunakan untuk membuat card header.
 *
 * @param {string} title
 * @param {string} blockName
 * @returns {HTMLElement}
 */
export function header(title, blockName) {
  /** @type {HTMLElement} */
  const header = withElement("header")
    .setClass([`${blockName}__header`])
    .build();

  /** @type {HTMLHeadingElement} */
  const titleHeader = /** @type {HTMLHeadingElement} */ (
    withElement("h2")
      .setClass([`${blockName}__title`])
      .setInnerText(toCamelCase(title))
      .build()
  );

  /** @type {HTMLButtonElement} */
  const iconButton = button({
    classNames: [],
    label: "",
    attributes: {
      type: "button",
      "aria-label": "menu",
    },
  });

  /** @type {HTMLElement} */
  const icon = withElement("ion-icon")
    .setClass([`${blockName}__icon`])
    .setAttribute({ name: "ellipsis-horizontal", "aria-hidden": "true" })
    .build();

  iconButton.append(icon);
  header.append(titleHeader, iconButton);
  return header;
}

/**
 * Function yang digunakan untuk membuat card body.
 *
 * @param {string} blockName
 * @param {string} timeframe
 * @param {number} current
 * @param {number} previous
 * @returns {HTMLElement}
 */
export function body(blockName, timeframe, current, previous) {
  /** @type {HTMLElement} */
  const body = withElement("div")
    .setClass([`${blockName}__body`])
    .build();

  /** @type {HTMLTimeElement} */
  const time = /** @type {HTMLTimeElement} */ (
    withElement("time")
      .setClass([`${blockName}__time`])
      .setAttribute({ datetime: `PT${current}H` })
      .setInnerText(`${current}hrs`)
      .build()
  );

  /** @type {HTMLSpanElement} */
  const desc = /** @type {HTMLSpanElement} */ (
    withElement("span")
      .setClass([`${blockName}__desc`])
      .setInnerText(`${createDescText(timeframe)} - ${previous}hrs`)
      .build()
  );

  body.append(time, desc);
  return body;
}

/**
 * Function yang digunakan untuk membuat card wrapper.
 * Wrapper ini akan digunakan sebagai pembungkus card header dan card body
 *
 * @param {string} blockName
 * @returns {HTMLElement}
 */
export function wrapper(blockName) {
  return withElement("div")
    .setClass([`${blockName}__wrapper`])
    .build();
}

/**
 * Function yang digunakan untuk membuat card parent.
 *
 * @param {string} blockName
 * @returns {HTMLElement}
 */
export function section(blockName) {
  return withElement("section")
    .setClass([`${blockName}`])
    .build();
}
