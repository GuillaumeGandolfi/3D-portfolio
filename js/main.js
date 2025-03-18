import {
  showTerminal,
  addTerminalButton,
  transitionToFirstProject,
  showFirstProjectInfo,
} from "./terminal.js";

import * as THREE from "three";

// Initialisation de la scène
const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Génération des étoiles
const starCount = 8000;
const positions = new Float32Array(starCount * 3);

function generateStars() {
  for (let i = 0; i < starCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 2000;
    positions[i + 1] = (Math.random() - 0.5) * 2000;
    positions[i + 2] = (Math.random() - 0.5) * 2000;
  }
}
generateStars();

const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 2,
  sizeAttenuation: true,
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Création du point cliquable (étoile spéciale)
const pointGeometry = new THREE.SphereGeometry(20, 40, 40);
const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
const clickablePoint = new THREE.Mesh(pointGeometry, pointMaterial);

// Position initiale autour du centre
const orbitRadius = 400;
let angle = Math.random() * Math.PI * 2;
clickablePoint.position.set(
  Math.cos(angle) * orbitRadius,
  Math.sin(angle) * orbitRadius,
  -500
);

scene.add(clickablePoint);

// Détection du survol et du clic
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(clickablePoint);

  if (intersects.length > 0) {
    document.body.style.cursor = "pointer";
    clickablePoint.material.color.set(0xff4500);
  } else {
    document.body.style.cursor = "default";
    clickablePoint.material.color.set(0xffd700);
  }
}

let terminalExists = false;

function onClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(clickablePoint);

  if (intersects.length > 0 && !terminalExists) {
    terminalExists = true;
    showTerminal();
  }
}

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("click", onClick);

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  stars.rotation.x += 0.0003;

  angle += 0.0008;
  clickablePoint.position.x = Math.cos(angle) * orbitRadius;
  clickablePoint.position.y = Math.sin(angle) * orbitRadius;

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
