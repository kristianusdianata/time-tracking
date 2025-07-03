// @ts-check

/**
 * @typedef {object} MenuItem
 * @property {string} timeframe
 * @property {HTMLLIElement} element
 */

/** @class */
export class MenuItemState {
  /**
   * @constructor
   */
  constructor() {
    /**
     * Index dari menu item yang sedang aktif
     *
     * @type {number}
     * @default 0
     */
    this.index = 0;

    /**
     * List dari menu item yang tersimpan di state ini
     *
     * @type {MenuItem[]}
     * @default []
     */
    this.listItem = [];
  }

  /**
   * @function
   * @returns {number}
   */
  getIndex() {
    return this.index;
  }

  /**
   * @function
   * @returns {MenuItem[]}
   */
  getListItem() {
    return this.listItem;
  }

  /**
   * @function
   * @returns {void}
   */
  reset() {
    this.index = 0;
    this.listItem = [];
  }

  /**
   * @param {Array<(listItems: MenuItem[], index: number, api: { updateIndex(index: number):void , addItem(item: MenuItem): void}) => void>} steps
   */
  runPipeline(steps) {
    for (const fn of steps) {
      fn(this.listItem, this.index, {
        updateIndex: (index) => {
          this.index = index;
        },
        addItem: (item) => {
          this.listItem.push(item);
        },
      });
    }
  }
}
