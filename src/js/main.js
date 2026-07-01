document.addEventListener("DOMContentLoaded", () => {
  // ========== Theme Toggle ==========
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon   = document.getElementById("theme-icon");
  const html        = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeIcon.className = theme === "dark" ? "lni lni-sun-1" : "lni lni-moon-half-right-5";
  }

  // Default to dark; restore from localStorage if previously set
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  // ========== Active nav link on scroll ==========
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  function setActiveLinkOnScroll() {
    const scrollPos = window.scrollY + 200;
    sections.forEach((section) => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((nav) => nav.classList.remove("active-link"));
        const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (link) link.classList.add("active-link");
      }
    });
  }

  // ========== Mobile nav toggle ==========
  document.getElementById("nav-toggle").addEventListener("click", () => {
    document.getElementById("nav-menu").classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("nav-menu").classList.remove("active");
    });
  });

  // ========== Scroll hint fade ==========
  const scrollHint = document.querySelector(".scroll-down");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      scrollHint.style.opacity = "0";
      scrollHint.style.pointerEvents = "none";
    } else {
      scrollHint.style.opacity = "1";
      scrollHint.style.pointerEvents = "auto";
    }
  });

  // ========== Smooth scroll on nav link click ==========
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = e.currentTarget.getAttribute("href").substring(1);
      const target    = document.getElementById(sectionId);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        navLinks.forEach((nav) => nav.classList.remove("active-link"));
        e.currentTarget.classList.add("active-link");
      }, 300);
    });
  });

  // ========== Scroll event & init ==========
  window.addEventListener("scroll", setActiveLinkOnScroll);
  document.querySelector('.nav-link[href="#about"]').classList.add("active-link");
  setActiveLinkOnScroll();

  // ========== Footer year ==========
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
