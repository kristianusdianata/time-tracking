// @ts-check

/**
 * @template T
 * @typedef {Object} QueryChain
 * @property {(fn: (item: T, index: number, array: T[]) => boolean) => QueryChain<T>} filter - API chain yang bertugas untuk melakukan filter data.
 * @property {<U>(fn: (item: T, index: number, array: T[]) => U) => QueryChain<U>} map - API chain yang bertugas untuk melakukan mapping data.
 * @property {() => T[]} get - API yang mengembalikan hasil dari chain.
 * @property {(key: keyof T) => string[]} getKeys - API yang mengembalikan data key pada sebuah object.
 */

/**
 * Reusable wrapper yang bertugas sebagai data handler seperti filter, map, dan sebagainya.
 * Wrapper ini bisa di chain sesuai dengan kebutuhan.
 *
 * @function
 * @template T
 * @param {T[]} datas - Data array
 * @return {QueryChain<T>}
 * @example
 *
 * // Sample data
 * const users = [
 *  { id: 1, name: "Alice" },
 *  { id: 6, name: "Bob" },
 *  { id: 3, name: "Charlie" }
 * ];
 *
 * // Get name with id < 5
 * const names =
 *  withQuery(users)
 *   .filter(item => item.id < 5)
 *   .map(item => item.name)
 *   .get(); // ['Alice', 'Charlie']
 *
 * // Get users keys
 * const users = [
 *  {
 *    title: "Work",
 *    timeframes: {
 *      daily: {
 *         current: 5,
 *        previous: 7,
 *      },
 *      weekly: {
 *         current: 32,
 *        previous: 36,
 *      },
 *      monthly: {
 *         current: 103,
 *        previous: 128,
 *      },
 *    },
 *  },
 * ];
 *
 * const usersQuery = withQuery(users);
 * console.log(usersQuery.getKeys("timeframes")); // ["daily", "weekly", "monthly"]
 */
export function withQuery(datas) {
  return {
    filter(fn) {
      return withQuery(datas.filter(fn));
    },
    map(fn) {
      return withQuery(datas.map(fn));
    },
    get() {
      return datas;
    },
    getKeys(key) {
      const value = datas[0][key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return Object.keys(value);
      }
      return [];
    },
  };
}
