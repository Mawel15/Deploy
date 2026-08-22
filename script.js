document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Appear / Disappear
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) =>
        e.target.classList.toggle("visible", e.isIntersecting)
      );
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // 2. Mobile Menu & Active Nav Links
  const toggle = document.querySelector("#nav-toggle");
  const menu = document.querySelector("#nav-menu");
  const links = document.querySelectorAll(".nav-item");

  toggle?.addEventListener("click", () => menu.classList.toggle("open"));
  links.forEach((l) =>
    l.addEventListener("click", () => menu.classList.remove("open"))
  );

  window.addEventListener("scroll", () => {
    const pos = window.pageYOffset + 180;
    document.querySelectorAll("section").forEach((s) => {
      if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
        links.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === `#${s.id}`)
        );
      }
    });
  });

  // 3. Quick Copy with Toast
  const toast = document.querySelector("#toast");
  document.querySelectorAll("[data-copy]").forEach((el) => {
    el.addEventListener("click", () => {
      const text = el.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        toast.textContent = `Copied: ${text}`;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2200);
      });
    });
  });

  // 4. Modal Screenshot Slider
  const modal = document.querySelector("#modal");
  const slides = document.querySelectorAll(".slide");
  const counter = document.querySelector("#slide-num");
  let idx = 0;

  const show = (i) => {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("active", n === idx));
    if (counter) counter.textContent = `${idx + 1} / ${slides.length}`;
  };

  document.querySelector("#open-modal")?.addEventListener("click", () => {
    modal.classList.add("active");
    show(0);
  });
  document
    .querySelector("#modal-close")
    ?.addEventListener("click", () => modal.classList.remove("active"));
  document
    .querySelector("#prev")
    ?.addEventListener("click", () => show(idx - 1));
  document
    .querySelector("#next")
    ?.addEventListener("click", () => show(idx + 1));
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
});