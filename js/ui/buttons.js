import { transitionToFirstProject } from "./projectDisplay.js";

export function addTerminalButton(container, terminal) {
  let button = document.createElement("button");
  button.textContent = "Voir mon premier projet";

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
