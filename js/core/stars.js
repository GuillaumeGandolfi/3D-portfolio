import * as THREE from "three";
import { scene } from "./scene.js";

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

export const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);
