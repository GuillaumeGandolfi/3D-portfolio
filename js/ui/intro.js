import { startAnimation } from "../core/loop.js";
import { trackLabel } from "../core/interactions.js";
import { typeWriter } from "./typewriter.js";

export function startIntro() {
  // Création du conteneur HUD
  const intro = document.createElement("div");
  intro.classList.add("intro-hud");

  intro.innerHTML = `<p id="intro-text"></p>`;
  document.body.appendChild(intro);

  const lines = [
    "[DÉMARRAGE DU TERMINAL SPATIAL]",
    "",
    "Connexion établie avec le vaisseau personnel de Guillaume Gandolfi...",
    "",
    "Chargement de l'environnement galactique...",
    "",
    "Systèmes en ligne : OK",
    "",
    "Bienvenue à bord, explorateur !",
    "",
    "Ce portfolio est une expérience interactive,",
    "développée entièrement avec Three.js.",
    "",
    "Entre animations 3D, narration et projets concrets,",
    "je t’invite à naviguer dans mon univers de développeur web.",
    "",
    "Installe-toi confortablement.",
    "",
    "L'aventure ne fait que commencer...",
    "",
    "Préparation du voyage intersidéral...",
    "",
    "Destination : Galaxie des projets",
  ];

  const textEl = document.getElementById("intro-text");
  let i = 0;

  // Fonction pour afficher une ligne avec points animés
  function showLineWithDots(line, dotCount, onComplete) {
    let currentDots = 0;
    let baseLine = line;

    // On garde tout l'historique
    const linesSoFar = textEl.textContent;

    function step() {
      const tempLine = baseLine + ".".repeat(currentDots);
      textEl.textContent = linesSoFar + "\n" + tempLine;
      textEl.scrollTop = textEl.scrollHeight;

      currentDots++;

      if (currentDots <= dotCount) {
        setTimeout(step, 150);
      } else {
        // Ajoute définitivement la ligne terminée
        textEl.textContent =
          linesSoFar + "\n" + baseLine + ".".repeat(dotCount) + "\n";
        textEl.scrollTop = textEl.scrollHeight;
        onComplete();
      }
    }

    step();
  }

  function showTypedLine(line, onComplete) {
    const previous = textEl.textContent;
    typeWriter(textEl, previous + "\n" + line, onComplete);
  }

  // Enchaîner les lignes une par une
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

  // Transition vers la galaxie
  function endIntro() {
    intro.style.opacity = 0;
    setTimeout(() => {
      intro.remove();
      startAnimation();
      trackLabel();
      document.getElementById("planet-label").style.opacity = "1";
    }, 1000);
  }

  // Lancer l’intro
  nextLine();
}
