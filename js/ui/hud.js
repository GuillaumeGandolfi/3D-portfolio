import * as THREE from "three";
import { scene, camera, renderer } from "../core/scene.js";

export function createHUD() {
  const hudScene = new THREE.Scene();
  const hudCamera = new THREE.OrthographicCamera(
    -window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    -window.innerHeight / 2,
    0.1,
    10
  );

  // Cadre néon
  const frameGeometry = new THREE.BoxGeometry(
    window.innerWidth - 40,
    window.innerHeight - 40,
    1
  );
  const frameMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const frameEdges = new THREE.EdgesGeometry(frameGeometry);
  const neonFrame = new THREE.LineSegments(frameEdges, frameMaterial);
  neonFrame.position.z = -5;
  hudScene.add(neonFrame);

  // Cercle au centre du hud
  const circleGeometry = new THREE.CircleGeometry(50, 32);
  const circleMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const circleEdges = new THREE.EdgesGeometry(circleGeometry);
  const circle = new THREE.LineSegments(circleEdges, circleMaterial);
  circle.position.set(0, 0, -4);
  hudScene.add(circle);

  // Lignes
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const points = [
    new THREE.Vector3(-100, -50, -4),
    new THREE.Vector3(100, 50, -4),
    new THREE.Vector3(-50, 100, -4),
    new THREE.Vector3(50, -100, -4),
  ];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const neonLines = new THREE.Line(lineGeometry, lineMaterial);
  hudScene.add(neonLines);

  function animateHUD() {
    requestAnimationFrame(animateHUD);
    renderer.autoClear = false;
    renderer.clearDepth();
    renderer.render(hudScene, hudCamera);
  }

  animateHUD();
}
