//  @ts-check

/**
 * Reusable wrapper yang bertugas untuk melakukan fetch data secara async
 * berdasarkan `URL` yang diberikan.
 *
 * @template T
 * @param {URL} url - URL
 * @returns {() => Promise<T>} Mengembalikan resolve parsed data dalam bentuk bentuk promise.
 * @example
 *
 * const url = new URL("./user.json", import.meta.url);
 * const fetchUser = withFetchAsync(url);
 *
 * const user = await fetchUser();
 * console.log(user.name); // e.g., "Alice"
 */
export function withFetchAsync(url) {
  return async function wrapper() {
    /** @type {Response} */
    const response = await fetch(url);

    /** @type {T} */
    const jsonData = await response.json();

    return jsonData;
  };
}
