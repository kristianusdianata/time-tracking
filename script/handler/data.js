import { toCamelCase } from "../utils.js";

export async function data() {
  const response = async () => {
    try {
      const response = await fetch(new URL("../../data.json", import.meta.url));

      // cek response
      if (!response.ok) {
        alert("data.json not found");
        return;
      }

      return response.json();
    } catch (error) {
      console.error(error.message);
    }
  };

  const listData = await response();

  function getTitle() {
    return listData.map((data) => data.title);
  }

  function getTimeFrameKeys() {
    return listData.map((data) => Object.keys(data.timeframes))[0];
  }

  function getDataByTimeFrame(title, timeframe) {
    const _title = toCamelCase(title);
    const _timeframe = timeframe.toLowerCase();

    return listData
      .filter((data) => {
        return data.title === _title;
      })
      .map((data) => data.timeframes[_timeframe])[0];
  }

  return {
    getTitle,
    getTimeFrameKeys,
    getDataByTimeFrame,
  };
}
