/* =========================================================
   PORTFOLIO JAVASCRIPT
   - Mobile Navigation Toggle
   - Active Navigation Highlight on Scroll
   - Scroll Reveal Animations
   ========================================================= */

/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

const navToggle = document.querySelector("#nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Open / close mobile menu
navToggle.addEventListener("click", function () {
  navMenu.classList.toggle("open");
});

// Close mobile menu when a navigation link is clicked
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
  });
});

/* =========================================================
   2. ACTIVE NAVIGATION ON SCROLL
   ========================================================= */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", function () {
  const scrollPosition = window.pageYOffset + 180;

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
});

/* =========================================================
   3. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealSections = document.querySelectorAll(".section");

function checkSectionReveal() {
  const triggerBottom = window.innerHeight * 0.85;

  revealSections.forEach(function (section) {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;

    // Show section when it enters the viewport
    if (sectionTop < triggerBottom && sectionBottom > 0) {
      section.classList.add("section-visible");
    }

    // Hide section when it leaves the viewport
    else if (sectionBottom <= 0 || sectionTop >= window.innerHeight) {
      section.classList.remove("section-visible");
    }
  });
}

// Run reveal animation on scroll
window.addEventListener("scroll", checkSectionReveal);

// Run once when the page loads
window.addEventListener("load", checkSectionReveal);

/* =========================================================
   4. PROJECT SCREENSHOTS MODAL & SLIDER
   ========================================================= */

const openModalBtn = document.querySelector("#open-modal-btn");
const modal = document.querySelector("#project-modal");
const modalCloseBtn = document.querySelector("#modal-close");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector("#prev-slide");
const nextBtn = document.querySelector("#next-slide");
const slideCounter = document.querySelector("#slide-counter");
const dotsContainer = document.querySelector("#slider-dots");

let currentSlideIndex = 0;

// Create indicators dynamically
if (slides.length > 0 && dotsContainer) {
  slides.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });
}

function updateSlider() {
  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === currentSlideIndex);
  });

  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentSlideIndex);
  });

  if (slideCounter) {
    slideCounter.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
  }
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateSlider();
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

// Open / Close Modal
if (openModalBtn && modal) {
  openModalBtn.addEventListener("click", () => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent scrolling while open
  });

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  modalCloseBtn.addEventListener("click", closeModal);

  // Close when clicking on backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape or switch with arrow keys
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);
}
