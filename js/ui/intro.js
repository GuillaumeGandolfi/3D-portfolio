import { startAnimation } from "../core/loop.js";
import { trackLabel } from "../core/interactions.js";
import { typeWriter } from "./typewriter.js";

export function startIntro() {
  // Création du conteneur HUD
  const intro = document.createElement("div");
  intro.classList.add("intro-hud");

  intro.innerHTML = `<p id="intro-text"></p>`;
  document.body.appendChild(intro);

  // Lignes avec texte et nombre de points progressifs
  const lines = [
    "SYSTÈME EN RÉVEIL...",
    "",
    ">>> Lancement des modules sensoriels...",
    ">>> Fréquences cérébrales détectées...",
    "",
    "VOUS.",
    "Vous êtes là.",
    "Un visiteur isolé dans le vide numérique.",
    "",
    "Chargement du dossier GUILL-AUME...",
    "",
    "« Ancien chercheur en biologie marine. Navigateur des données. Alchimiste du web. »",
    "",
    ">>> Initialisation de l’interface de présentation...",
    ">>> Vérification des liens projet...",
    ">>> ERREUR : instabilité détectée...",
    "",
    "⚠️  Éjection imminente",
    "",
    "Bienvenue dans l’espace personnel de Guillaume.",
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

      textEl.appendChild(lineElement);

      typeWriter(lineElement, line, () => {
        i++;
        setTimeout(nextLine, 300);
      });
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
