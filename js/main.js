import {
  showTerminal,
  addTerminalButton,
  transitionToFirstProject,
  showFirstProjectInfo,
} from "./ui/terminal.js";
import { scene, camera, renderer } from "./core/scene.js";
import { stars } from "./core/stars.js";
import { clickablePoint } from "./core/interactions.js";
import { startAnimation } from "./core/loop.js";

startAnimation();
