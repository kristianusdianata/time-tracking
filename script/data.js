import { toCamelCase } from "./utils.js";

const data = async () => {
  try {
    const response = await fetch("../data.json");

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

export async function getTitle() {
  return await data().then((response) => {
    return response.map((data) => data.title);
  });
}

export async function getTimeFrames($title, $timeframe) {
  const _title = toCamelCase($title);
  const _timeframe = $timeframe.toLowerCase();

  return await data().then((response) => {
    return response
      .filter((data) => {
        return data.title === _title;
      })
      .map((data) => data.timeframes[_timeframe])[0];
  });
}

export async function getTimeFrameKey() {
  return await data().then((response) => {
    return response.map((data) => Object.keys(data.timeframes))[0];
  });
}
