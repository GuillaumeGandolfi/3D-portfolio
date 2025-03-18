import { camera } from "../core/scene.js";

export function showTerminal() {
  let terminal = document.createElement("div");
  terminal.classList.add("terminal");

  let terminalContent = document.createElement("div");
  terminalContent.classList.add("terminal-content");

  let terminalText = document.createElement("p");
  terminalContent.appendChild(terminalText);

  let cursor = document.createElement("span");
  cursor.classList.add("cursor");
  terminalText.appendChild(cursor);

  terminal.appendChild(terminalContent);
  document.body.appendChild(terminal);

  setTimeout(() => {
    terminal.style.visibility = "visible";
    terminal.style.opacity = "1";
    terminal.style.transform = "translate(-50%, -50%) scale(1)";
  }, 200);

  let text = `DÉMARRAGE DU SYSTÈME...
CHARGEMENT DES FICHIERS...
CONNEXION AU SERVEUR PRINCIPAL...

IDENTIFICATION DE L'UTILISATEUR
> Nom : Guillaume
> Rôle : Développeur Web
> Spécialité : Sites performants et modernes

ANALYSE DES DONNÉES EN COURS...

HISTORIQUE RETROUVÉ :
J'ai d'abord exploré les profondeurs de la biologie marine, cherchant à comprendre les écosystèmes aquatiques.
C'est en découvrant la bioinformatique que je me suis confronté à la programmation, en analysant des données biologiques à grande échelle.

MISE À JOUR DU SYSTÈME EN COURS...

L'informatique est devenue bien plus qu'un outil : c'était un univers à explorer.
Je me suis alors spécialisé dans le développement web, créant des sites modernes et rapides.

COMPÉTENCES DÉTECTÉES :
- Sites vitrines ultra-performants avec Astro
- Développement frontend avec React & Next.js
- Gestion de bases de données et backend

FINALISATION DES PARAMÈTRES...

Aujourd’hui, je conçois des expériences web optimisées et rapides, alliant design, performance et accessibilité.
Toujours en quête de nouveaux défis, j'explore sans cesse les possibilités du web moderne.

>>> SYSTÈME OPÉRATIONNEL. ACCÈS AUTORISÉ.`;

  typeWriter(terminalText, text, () => {
    addTerminalButton(terminalContent, terminal);
  });
}

export function typeWriter(element, text, callback) {
  let index = 0;

  // Détection si on est en local ou en ligne
  let isDev = window.location.hostname === "localhost";
  let typingSpeed = isDev ? 1 : 100; // Rapide en local, normal en prod

  function write() {
    if (index < text.length) {
      element.innerHTML = `${text.slice(
        0,
        index
      )}<span class="cursor">|</span>`;

      index += 5;

      element.parentElement.scrollTop = element.parentElement.scrollHeight;

      setTimeout(write, typingSpeed);
    } else {
      element.innerHTML = text;

      setTimeout(() => {
        element.parentElement.scrollTop = element.parentElement.scrollHeight;
      }, 50);

      callback();
    }
  }

  write();
}

export function addTerminalButton(container, terminal) {
  let button = document.createElement("button");
  button.textContent = "Voir mon premier projet";

  // Styles du bouton
  button.style.padding = "12px 24px";
  button.style.border = "2px solid #0f0";
  button.style.background = "black";
  button.style.color = "#0f0";
  button.style.fontFamily = "Courier New";
  button.style.fontSize = "16px";
  button.style.cursor = "pointer";
  button.style.transition = "background 0.3s, transform 0.2s, opacity 0.5s";
  button.style.boxShadow = "0 0 10px #0f0";
  button.style.opacity = "0";
  button.style.textAlign = "center";
  button.style.width = "fit-content";

  button.onmouseover = () => {
    button.style.background = "#0f0";
    button.style.color = "black";
    button.style.transform = "scale(1.05)";
  };

  button.onmouseout = () => {
    button.style.background = "black";
    button.style.color = "#0f0";
    button.style.transform = "scale(1)";
  };

  let buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "40px";
  buttonContainer.style.width = "100%";
  buttonContainer.appendChild(button);

  container.appendChild(buttonContainer);

  setTimeout(() => {
    button.style.opacity = "1";
  }, 100);

  button.onclick = () => {
    terminal.style.opacity = "0";
    setTimeout(() => {
      terminal.remove();
      transitionToFirstProject();
    }, 500);
  };
}

export function transitionToFirstProject() {
  let targetPosition = { x: 0, y: 0, z: 300 };
  let duration = 3000;

  let startTime = performance.now();
  let initialPosition = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  };

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animateCamera(time) {
    let elapsed = time - startTime;
    let t = Math.min(elapsed / duration, 1);
    let easedT = easeOutQuad(t);

    camera.position.x =
      initialPosition.x + (targetPosition.x - initialPosition.x) * easedT;
    camera.position.y =
      initialPosition.y + (targetPosition.y - initialPosition.y) * easedT;
    camera.position.z =
      initialPosition.z + (targetPosition.z - initialPosition.z) * easedT;

    if (t < 1) {
      requestAnimationFrame(animateCamera);
    } else {
      showFirstProjectInfo();
    }
  }

  requestAnimationFrame(animateCamera);
}

export function showFirstProjectInfo() {
  let projectBox = document.createElement("div");
  projectBox.id = "project-info";

  projectBox.style.position = "absolute";
  projectBox.style.top = "50%";
  projectBox.style.left = "50%";
  projectBox.style.transform = "translate(-50%, -50%) scale(0.9)";
  projectBox.style.padding = "20px";
  projectBox.style.color = "#0f0";
  projectBox.style.border = "2px solid rgba(15, 255, 15, 0.7)";
  projectBox.style.boxShadow = "0 0 15px rgba(15, 255, 15, 0.5)";
  projectBox.style.background = "rgba(0, 0, 0, 0.5)";
  projectBox.style.fontFamily = "Courier New";
  projectBox.style.fontSize = "18px";
  projectBox.style.textAlign = "center";
  projectBox.style.opacity = "0";
  projectBox.style.width = "600px";
  projectBox.style.transition = "opacity 1s ease-out, transform 0.5s ease-out";

  projectBox.innerHTML = `
    <h2 style="text-transform: uppercase; letter-spacing: 2px; color: #fff;">Analyse Bioinformatique</h2>
    <p style="font-style: italic; color: #bbb;">Identification des variants du RYMV <b>(Rice Yellow Mottle Virus)</b> en Afrique.</p>
    
    <p><b style="color: #fff;">Objectif :</b> Automatiser l'analyse pour aider les techniciens.</p>
    <p><b style="color: #fff;">Technologies :</b> Snakemake, Python, outils bioinfo</p>
    <p><b style="color: #fff;">Serveur :</b> Infrastructure de calcul local</p>
    <p><b style="color: #fff;">Résultat :</b> Identification automatique des variants.</p>
    <p><b style="color: #fff;">Publication :</b> Co-auteur de l'article scientifique.</p>
    
    <br>
    <img src="./assets/images/rvhaplo_screen.png" alt="Aperçu du projet" style="width: 90%; max-height: 300px; border: 2px solid #0f0; box-shadow: 0 0 10px #0f0; border-radius: 5px;">
    <br><br>

    <a href="https://github.com/GuillaumeGandolfi/Pipeline_RVHaplo" target="_blank" style="color: #0f0; text-decoration: none; font-weight: bold;">Voir sur GitHub</a>
    <br><br>
    <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0311555" target="_blank" style="color: #0f0; text-decoration: none; font-weight: bold;">Lire l'article</a>
    
    <br><br>
    <button id="next-project-btn">Projet suivant</button>
  `;

  document.body.appendChild(projectBox);

  // Animation d’apparition
  setTimeout(() => {
    projectBox.style.opacity = "1";
    projectBox.style.transform = "translate(-50%, -50%) scale(1)";
  }, 500);
}
