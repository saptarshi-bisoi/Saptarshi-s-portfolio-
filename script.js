// Simplified site script: theme toggle, mobile menu, smooth scroll, footer year

// Theme toggle (stores preference as 'light' or removes attribute for dark)
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  if (body.getAttribute("data-theme") === "light") {
    body.removeAttribute("data-theme");
    if (themeIcon) themeIcon.className = "fas fa-moon";
    localStorage.setItem('theme','dark');
  } else {
    body.setAttribute("data-theme", "light");
    if (themeIcon) themeIcon.className = "fas fa-sun";
    localStorage.setItem('theme','light');
  }
}

// Mobile menu toggle
document.addEventListener('click', function (e) {
  const toggle = e.target.closest('.mobile-menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    nav.classList.toggle('active');
  }
});

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Footer year
window.addEventListener('load', function () {
  const yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear();
  // apply saved theme
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.setAttribute('data-theme','light');
});

// Minimal form handler (if contact form exists)
function handleSubmit(e) {
  if (!e) return;
  e.preventDefault();
  const name = document.getElementById('name')?.value || 'Guest';
  alert(`Thanks, ${name}! Message received.`);
  e.target.reset?.();
}
window.addEventListener("load", handleScrollAnimations);

// Create particle system
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Random position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    // Random animation delay
    particle.style.animationDelay = Math.random() * 8 + "s";

    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
window.addEventListener("load", createParticles);

// Scroll indicator functionality
function initScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });

    // Hide scroll indicator when user scrolls down
    window.addEventListener("scroll", function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.pointerEvents = "none";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.pointerEvents = "auto";
      }
    });
  }
}

// Initialize scroll indicator
window.addEventListener("load", initScrollIndicator);

// Add active nav link highlighting
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Footer: current year
window.addEventListener("load", function () {
  const yr = document.getElementById("current-year");
  if (yr) {
    yr.textContent = new Date().getFullYear();
  }
});
