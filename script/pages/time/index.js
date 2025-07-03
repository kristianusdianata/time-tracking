//  @ts-check

import { loopHandler, withElement, withState } from "../../utils/index.js";
import { CardState } from "./cardState.js";
import { dataTimeQuery } from "../../data.js";
import { section, wrapper, body, header } from "./cardComponents.js";
import { createDescText, generateBlockName } from "./utils.js";

/**
 * @function
 * @type {ReturnType<typeof withState<CardState>>}
 */
const stateFn = withState(CardState);

/**
 * @function
 * @param {string} timeframe
 * @returns {void}
 */
export function appendCard(timeframe) {
  /** @type {HTMLElement | null} */
  const containerCard = document.querySelector(".container-card");

  /**
   * @constant
   * @type {string[]} */
  const titles = dataTimeQuery.map((data) => data.title).get();

  loopHandler(titles, (title, index) => {
    /**
     * @constant
     * @type {{
     *  current: number,
     *  previous: number
     * }}
     */
    const { current, previous } = dataTimeQuery
      .filter((data) => data.title === title)
      .map((data) => data.timeframes[timeframe.toLowerCase()])
      .get()[0];

    /** @type {string} */
    const blockName = generateBlockName(title);

    stateFn.runPipeline([
      /** Step 1 */
      function addCardToState(_, { addItem }) {
        /**
         * @const
         * @type {HTMLElement}
         */
        const sectionElement = section(blockName);

        /**
         * @const
         * @type {HTMLElement}
         */
        const cardWrapper = wrapper(blockName);

        /**
         * @const
         * @type {HTMLElement}
         */
        const cardHeader = header(title, blockName);

        /**
         * @const
         * @type {HTMLElement}
         */
        const cardBody = body(blockName, timeframe, current, previous);

        cardWrapper.append(cardHeader, cardBody);
        sectionElement.append(cardWrapper);
        addItem({
          title,
          card: sectionElement,
        });
      },

      /** Step 2 */
      function appendCardToContainer(listCards) {
        if (containerCard)
          containerCard.insertAdjacentElement(
            "beforeend",
            listCards[index].card
          );
      },
    ]);
  });
}

/**
 * @function
 * @param {string} timeframe
 * @return {void}
 */
export function updateCardText(timeframe) {
  stateFn.runPipeline([
    /** Step 1 */
    function updateText(listCards) {
      loopHandler(listCards, (listCard, _) => {
        const blockName = generateBlockName(listCard.title);

        /**
         * @constant
         * @type {{
         *  current: number,
         *  previous: number
         * }}
         */
        const { current, previous } = dataTimeQuery
          .filter((data) => data.title === listCard.title)
          .map((data) => data.timeframes[timeframe.toLowerCase()])
          .get()[0];

        /** Update text */
        withElement(
          /** @type {HTMLElement} */ (
            listCard.card.querySelector(`.${blockName}__time`)
          )
        )
          .setAttribute({ datetime: `PT${current}H` })
          .setInnerText(`${current}hrs`);

        const timeDescElement = withElement(
          /** @type {HTMLElement} */ (
            listCard.card.querySelector(`.${blockName}__desc`)
          )
        ).setInnerText(`${createDescText(timeframe)} - ${previous}hrs`);
      });
    },
  ]);
}
