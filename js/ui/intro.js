import { startAnimation } from "../core/loop.js";
import { trackLabel } from "../core/interactions.js";
import { typeWriter } from "./typewriter.js";
import * as THREE from "three";

export function startIntro() {
  const intro = document.createElement("div");
  intro.classList.add("intro-hud");
  intro.innerHTML = `
  <div class="intro-shape-container">
    <canvas id="intro-canvas"></canvas>
  </div>
  <p id="intro-text"></p>
`;

  document.body.appendChild(intro);

  createWireframeCrystal();

  const lines = [
    "[DÉMARRAGE DU TERMINAL SPATIAL]",
    "",
    "Connexion établie avec le vaisseau personnel de Guillaume Gandolfi...",
    "",
    "Bienvenue à bord, explorateur !",
    "",
    "Ce portfolio est une expérience interactive,",
    "développée entièrement avec Three.js.",
    "",
    "Installe-toi confortablement.",
    "",
    "L'aventure ne fait que commencer...",
  ];

  const textEl = document.getElementById("intro-text");
  let i = 0;

  function nextLine() {
    if (i < lines.length) {
      const line = lines[i];
      const lineElement = document.createElement("div");

      if (line.trim() === "") {
        lineElement.style.height = "14px";
        textEl.appendChild(lineElement);
        i++;
        setTimeout(nextLine, 100);
      } else {
        textEl.appendChild(lineElement);
        typeWriter(lineElement, line, () => {
          i++;
          setTimeout(nextLine, 300);
        });
      }
    } else {
      endIntro();
    }
  }

  function endIntro() {
    const launchBtn = document.createElement("button");
    launchBtn.textContent = "Lancer l'exploration";
    launchBtn.classList.add("launch-button");
    intro.appendChild(launchBtn);

    launchBtn.onclick = () => {
      intro.style.opacity = 0;
      setTimeout(() => {
        intro.remove();
        startAnimation();
        trackLabel();
        document.getElementById("planet-label").style.opacity = "1";
      }, 1000);
    };
  }

  nextLine();
}

function createWireframeCrystal() {
  const canvas = document.getElementById("intro-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(120, 120);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
  camera.position.z = 3;

  // Forme d'octaèdre = effet gemme/rubis
  const geometry = new THREE.OctahedronGeometry(1);
  const wireframe = new THREE.WireframeGeometry(geometry);
  const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const crystal = new THREE.LineSegments(wireframe, material);

  scene.add(crystal);

  function animate() {
    requestAnimationFrame(animate);
    crystal.rotation.x += 0.01;
    crystal.rotation.y += 0.015;
    renderer.render(scene, camera);
  }

  animate();
}
