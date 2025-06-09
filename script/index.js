import { menu, time } from "./components/index.js";

async function main() {
  const timeComponent = await time();
  const menuComponent = await menu();

  function generateContent() {
    menuComponent.generateContent(timeComponent.generateContent);
  }

  function setActiveMenu() {
    menuComponent.setActiveMenu(timeComponent.updateLabelContents);
  }

  return {
    generateContent,
    setActiveMenu,
  };
}

const timeTracking = await main();
timeTracking.generateContent();
timeTracking.setActiveMenu();
