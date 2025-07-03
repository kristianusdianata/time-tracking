// @ts-check

/**
 * Reusable wrapper yang bertugas untuk menghandle `trycatch`
 *
 * @function
 * @template T
 * @param {(...args: any[]) => Promise<T>} fn - Async function yang membutuhkan `trycatch`.
 * @returns {(...args: any[]) => Promise<T | null>} Mengembalikan output dari async function jika berhasil `resolve`, dan mengembalikan null jika `rejected`
 * @example
 * // Contoh rejected function
 * const riskyFn = withErrorHandler(async function () {
 *   throw new Error("Something went wrong");
 * });
 *
 * // Call the function
 * riskyFn().then((response) => console.log(response)); // null
 *
 * // Contoh resolve function
 * const safeFn = withErrorHandler(async function () {
 *   return "Success!";
 * });
 *
 * safeFn().then((response) => console.log(response)); // "Success!"
 */
export function withErrorHandlerAsync(fn) {
  return async function wrapped(...args) {
    try {
      return await fn(...args);
    } catch (e) {
      console.error(e);
      return null;
    }
  };
}
