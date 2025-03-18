import { renderer, scene, camera } from "./scene.js";
import { stars } from "./stars.js";

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  stars.rotation.x += 0.0003;

  renderer.render(scene, camera);
}

export function startAnimation() {
  animate();
}
