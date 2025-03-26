import { trackLabel } from "./core/interactions.js";

import { showTerminal } from "./ui/terminal.js";
import {
  transitionToFirstProject,
  showFirstProjectInfo,
} from "./ui/projectDisplay.js";
import { scene, camera, renderer } from "./core/scene.js";
import { stars } from "./core/stars.js";
import { clickablePoint } from "./core/interactions.js";
import { startAnimation } from "./core/loop.js";

startAnimation();

// Suivi de l'étiquette de la planète
trackLabel(clickablePoint, renderer);
