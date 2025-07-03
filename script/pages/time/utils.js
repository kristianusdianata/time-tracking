/**
 * Generate block name berdasarkan title yang diberikan
 *
 * @function
 * @param {string} title
 */
export function generateBlockName(title) {
  return title.toLowerCase().replace(" ", "-");
}

/**
 * Generate desktipsi text berdasarkan data timeframe yang diberikan
 *
 * @function
 * @param {string} timeframe
 * @returns {string}
 */
export function createDescText(timeframe) {
  switch (timeframe.toLowerCase()) {
    case "daily": {
      return "Yesterday";
    }
    case "weekly": {
      return "Last Week";
    }
    case "monthly": {
      return "Last Month";
    }
    default: {
      return "";
    }
  }
}
