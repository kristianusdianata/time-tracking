// @ts-check

/**
 * Wrapper yang bertugas untuk membungkus class
 * dan mengembalikan semua method publiknya
 *
 * @template T
 * @param {new () => T} stateClass - Constructor dari class
 * @returns {T} - Instance dari class
 */
export function withState(stateClass) {
  return new stateClass();
}
