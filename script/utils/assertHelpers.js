// @ts-check

/**
 * Reuseable wrapper yang bertugas untuk membuat kostum assert.
 *
 * @function
 * @template T - Input dari tipe data yang ingin di assert
 * @template {T} U - Output dari tipe data yang di harapkan dari input
 * @param {(value: T) => boolean} predicate - Logic assert
 * @returns {(value: T) => U} Tipe data yang di harapkan
 * @throws {Error} If the predicate returns false.
 * @example
 *
 * // Membuat kostume assert untuk mengecek nilai undefined / null
 * const assertDefined  = withAssert((input) => input !== null, "Value must not be null")
 * assertDefined ("MyInput") // "MyInput"
 * assertDefined (null) // "Value must not be null"
 *
 * // Membuat kostume assert untuk mengecek nilai numeric
 * const assertNumber = withAssert((input) => typeof input === "number", "Value must be a number")
 * assertNumber(10) // 10
 * assertNumber("10") // "Value must be a number"
 */

export function withAssert(predicate, message = "Assertion failed") {
  return function wrapper(value) {
    if (!predicate(value)) throw new Error(message);
    return /** @type {U} */ (value);
  };
}
