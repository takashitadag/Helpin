let currentSize = 16;

function setFontSize(size) {
  currentSize = Math.max(14, Math.min(22, Number(size) || 16));
  document.documentElement.style.setProperty("--font-size", currentSize + "px");
  localStorage.setItem("fontSize", String(currentSize));
}

function increaseFont() {
  setFontSize(currentSize + 1);
}

function decreaseFont() {
  setFontSize(currentSize - 1);
}

function toggleContrast() {
  document.body.classList.toggle("contrast");
  localStorage.setItem("contrast", String(document.body.classList.contains("contrast")));
}

function toggleSeniorMode() {
  document.body.classList.toggle("senior");
  localStorage.setItem("senior", String(document.body.classList.contains("senior")));
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  const button = document.querySelector(".mobile-toggle");
  if (!menu) return;

  const isOpen = menu.classList.toggle("active");
  if (button) button.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  const menu = document.getElementById("menu");
  const button = document.querySelector(".mobile-toggle");
  if (menu) menu.classList.remove("active");
  if (button) button.setAttribute("aria-expanded", "false");
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(".hero-content, .hero-card, .stats, .section, .service, .card, .step, .contact-section");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach(element => element.classList.add("is-visible"));
    return;
  }

  elements.forEach(element => element.classList.add("reveal"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(element => observer.observe(element));
}

function initFaqBehaviour() {
  document.querySelectorAll(".faq details").forEach(detail => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;
      document.querySelectorAll(".faq details").forEach(other => {
        if (other !== detail) other.open = false;
      });
    });
  });
}

function initForms() {
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const requiredFields = form.querySelectorAll("[required]");
      const invalid = Array.from(requiredFields).find(field => !String(field.value || "").trim());

      if (invalid) {
        invalid.focus();
        alert("Prosím vyplňte všechna povinná pole.");
        return;
      }

      alert("Děkujeme. Formulář je zatím ukázkový – pro ostrý web je potřeba napojit odesílání na e-mail nebo backend.");
      form.reset();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedSize = localStorage.getItem("fontSize");
  const senior = localStorage.getItem("senior");
  const contrast = localStorage.getItem("contrast");

  if (savedSize) setFontSize(savedSize);
  if (senior === "true") document.body.classList.add("senior");
  if (contrast === "true") document.body.classList.add("contrast");

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  initRevealAnimations();
  initFaqBehaviour();
  initForms();
});
