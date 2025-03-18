import { camera } from "../core/scene.js";

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
