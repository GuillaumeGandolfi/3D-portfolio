export function typeWriter(element, text, callback) {
  let index = 0;

  // Détection si on est en local ou en ligne
  let isDev = window.location.hostname === "localhost";
  // Rapide en local, normal en prod
  let typingSpeed = isDev ? 1 : 100;

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
