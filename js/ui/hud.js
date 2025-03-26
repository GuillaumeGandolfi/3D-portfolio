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

  // Fond noir opaque pour le HUD
  const planeGeometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight
  );
  const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.z = -6;
  hudScene.add(plane);

  // Cadre néon
  const frameGeometry = new THREE.PlaneGeometry(
    window.innerWidth - 40,
    window.innerHeight - 40
  );
  const frameMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.3,
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.z = -5;
  hudScene.add(frame);

  // Cercle au centre du HUD
  const circleGeometry = new THREE.CircleGeometry(50, 32);
  const circleMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.3,
  });
  const circle = new THREE.Mesh(circleGeometry, circleMaterial);
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
