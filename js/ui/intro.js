import { startAnimation } from "../core/loop.js";
import { trackLabel } from "../core/interactions.js";
import { renderer } from "../core/scene.js";

export function startIntro() {
  const intro = document.createElement("div");
  intro.classList.add("intro-hud");
  intro.innerHTML = `<p id="intro-text"></p>`;
  document.body.appendChild(intro);

  const lines = [
    ">>> Initialisation du système...",
    ">>> Chargement des modules visuels...",
    ">>> Vérification du vaisseau...",
    ">>> ERREUR: Défaut de navigation !",
    ">>> Vous êtes éjecté dans l'espace...",
  ];

  let i = 0;

  function nextLine() {
    if (i < lines.length) {
      document.getElementById("intro-text").textContent += lines[i] + "\n";
      i++;
      setTimeout(nextLine, 1500);
    } else {
      // Transition vers la galaxie
      intro.style.opacity = 0;
      setTimeout(() => {
        startAnimation();
        trackLabel();
        document.getElementById("planet-label").style.opacity = "1";
      }, 1000);
    }
  }

  nextLine();
}
