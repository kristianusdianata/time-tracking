import { generateCardContent } from "./components/card.js";
import { generateListContent, setActiveMenu } from "./components/list.js";

await generateListContent();
await generateCardContent();
await setActiveMenu();
