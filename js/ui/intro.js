import { startAnimation } from "../core/loop.js";
import { trackLabel } from "../core/interactions.js";
import { typeWriter } from "./typewriter.js";
import * as THREE from "three";

export function startIntro() {
  // Création du conteneur principal de l'introduction
  const intro = document.createElement("div");
  intro.classList.add("intro-hud");
  intro.innerHTML = `
    <div class="intro-shape-container">
      <canvas id="intro-canvas"></canvas>
    </div>
    <p id="intro-text"></p>
  `;
  document.body.appendChild(intro);

  // Initialisation de la scène Three.js pour l'astéroïde
  initAsteroid();

  // Texte de l'introduction
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

  // Fonction pour afficher chaque ligne de texte avec un effet machine à écrire
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

  // Fonction appelée à la fin de l'introduction
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

  // Démarrage de l'affichage du texte
  nextLine();
}

// Fonction pour initialiser et animer l'astéroïde low-poly
function initAsteroid() {
  const canvas = document.getElementById("intro-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(150, 150);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
  camera.position.z = 3;

  // Création de la géométrie de l'astéroïde
  const geometry = new THREE.IcosahedronGeometry(1, 0); // Icosaèdre pour un effet low-poly
  const material = new THREE.MeshStandardMaterial({
    color: 0x888888,
    flatShading: true,
  });
  const asteroid = new THREE.Mesh(geometry, material);
  scene.add(asteroid);

  // Ajout d'une lumière directionnelle
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Fonction d'animation
  function animate() {
    requestAnimationFrame(animate);
    asteroid.rotation.x += 0.01;
    asteroid.rotation.y += 0.015;
    renderer.render(scene, camera);
  }

  animate();
}
