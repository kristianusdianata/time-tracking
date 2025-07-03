// @ts-check

/**
 * Utility function yang bertugas untuk melakukan transformasi text string ke format camelcase.
 *
 * @function
 * @param {string} text - Input text yang akan di transformasi ke format camelcase.
 * @returns {string} Mengembalikan hasil transformasi text.
 * @example
 * const text = toCamelCase("hello world")
 * console.log(text) // "Hello World"
 */
export function toCamelCase(text) {
  return text.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
}

/**
 * @function
 * @template T
 * @param  {...(input:T) => T} fns
 * @returns {(input: T) => T}
 */
export function runPipeline(...fns) {
  return function (input) {
    return fns.reduce((acc, fn) => fn(acc), input);
  };
}

/**
 * Helper yang berguna untuk melakukan looping array dan object.
 * return `fn(data, index)` untuk array dan `fn(value, key)` untuk object
 *
 * @template T
 * @param {T[] | Record<string, T>} datas - Data berbentuk array / object
 * @param {(data: T, keyOrIndex: string | number) => void} callbackFn - Callback yang akan dieksekui saat proses looping
 * @returns {void}
 */
export function loopHandler(datas, callbackFn) {
  if (Array.isArray(datas)) {
    datas.forEach((data, index) => {
      callbackFn(data, index);
    });
  } else if (typeof datas === "object" && datas !== null) {
    Object.entries(datas).forEach(([key, value]) => {
      callbackFn(value, key);
    });
  } else {
    /** Who are you? */
  }
}
