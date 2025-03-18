import { typeWriter } from "./typewriter.js";
import { addTerminalButton } from "./buttons.js";
import {
  transitionToFirstProject,
  showFirstProjectInfo,
} from "./projectDisplay.js";

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
