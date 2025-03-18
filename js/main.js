import {
  showTerminal,
  addTerminalButton,
  transitionToFirstProject,
  showFirstProjectInfo,
} from "./terminal.js";
import { scene, camera, renderer } from "./scene.js";
import { stars } from "./stars.js";
import { clickablePoint } from "./interactions.js";

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  stars.rotation.x += 0.0003;

  renderer.render(scene, camera);
}
animate();
