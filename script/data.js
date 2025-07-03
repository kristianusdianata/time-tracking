// @ts-check

import {
  withErrorHandlerAsync,
  withAssert,
  withFetchAsync,
  withQuery,
} from "./utils/index.js";

/**
 * Time frame data type
 *
 * @typedef {Object} TimeFrames
 * @property {number} current - Current time spent
 * @property {number} previous - Previous time spent
 */

/**
 * Data structure for time tracking
 *
 * @typedef DataTime
 * @property {string} title - Title
 * @property {object} timeframes - Timeframe (e.g., daily, weekly, monthly)
 * @property {TimeFrames} timeframes.daily - Daily time history
 * @property {TimeFrames} timeframes.weekly - Weekly time history
 * @property {TimeFrames} timeframes.monthly - Monthly time history
 */

/**
 * Asserts that a value is not null.
 *
 * @function
 * @type {<T>(value: T | null) => T}
 */
const withAssertDefined = withAssert((value) => value !== null);

/**
 * Fetches time tracking data from local JSON file.
 *
 * @function
 * @type {() => Promise<DataTime[] | null>}
 */
const fetchDataTime = withErrorHandlerAsync(
  withFetchAsync(new URL("./data.json", import.meta.url))
);

/**
 * Parsed time tracking data retrieved from the local JSON file.
 *
 * @constant
 * @type {DataTime[]}
 */
const dataTimes = withAssertDefined(await fetchDataTime());

/**
 * @function
 * @type {ReturnType<typeof withQuery<DataTime>>}
 */
export const dataTimeQuery = withQuery(dataTimes);
