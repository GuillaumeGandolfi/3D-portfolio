import * as THREE from "three";
import { scene, camera } from "./scene.js";
import { showTerminal } from "../ui/terminal.js";

const pointGeometry = new THREE.SphereGeometry(20, 40, 40);
const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
export const clickablePoint = new THREE.Mesh(pointGeometry, pointMaterial);

// Position initiale autour du centre
const orbitRadius = 400;
let angle = Math.random() * Math.PI * 2;
clickablePoint.position.set(
  Math.cos(angle) * orbitRadius,
  Math.sin(angle) * orbitRadius,
  -500
);

scene.add(clickablePoint);

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
