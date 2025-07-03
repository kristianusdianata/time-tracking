// @ts-check

/**
 * @typedef {object} CardList
 * @property {string} title
 * @property {HTMLElement} card
 */

/** @class */
export class CardState {
  /**
   * @constructor
   */
  constructor() {
    /**
     * List dari element card yang tersimpan di state ini
     *
     * @type {CardList[]}
     * @default []
     */
    this.listCards = [];
  }

  /**
   * @function
   * @returns {CardList[]}
   */
  getListCard() {
    return this.listCards;
  }

  /**
   * @function
   * @returns {void}
   */
  reset() {
    this.listCards = [];
  }

  /**
   * @param {Array<(listCard: CardList[], api: { addItem(item: CardList): void}) => void>} steps
   */
  runPipeline(steps) {
    for (const fn of steps) {
      fn(this.listCards, {
        addItem: (item) => {
          this.listCards.push(item);
        },
      });
    }
  }
}
