let currentSize = 16;

function increaseFont() {
  if (currentSize < 22) {
    currentSize += 1;
    document.documentElement.style.setProperty("--font-size", currentSize + "px");
    localStorage.setItem("fontSize", currentSize);
  }
}

function decreaseFont() {
  if (currentSize > 14) {
    currentSize -= 1;
    document.documentElement.style.setProperty("--font-size", currentSize + "px");
    localStorage.setItem("fontSize", currentSize);
  }
}

function toggleContrast() {
  document.body.classList.toggle("contrast");
  localStorage.setItem("contrast", document.body.classList.contains("contrast"));
}

function toggleSeniorMode() {
  document.body.classList.toggle("senior");
  localStorage.setItem("senior", document.body.classList.contains("senior"));
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (!menu) return;
  menu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const savedSize = localStorage.getItem("fontSize");
  const senior = localStorage.getItem("senior");
  const contrast = localStorage.getItem("contrast");

  if (savedSize) {
    currentSize = Number(savedSize);
    document.documentElement.style.setProperty("--font-size", currentSize + "px");
  }

  if (senior === "true") {
    document.body.classList.add("senior");
  }

  if (contrast === "true") {
    document.body.classList.add("contrast");
  }

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("menu");
      if (menu) menu.classList.remove("active");
    });
  });

  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      alert("Děkujeme. Formulář je zatím ukázkový – pro ostrý web je potřeba napojit odesílání na e-mail nebo backend.");
    });
  });
});
