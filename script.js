// Theme: dropdown Light / Dark / System
(function () {
  const THEME_KEY = "theme";
  const body = document.body;
  const icon = () => document.getElementById("theme-icon");
  const menu = () => document.getElementById("theme-dropdown");
  const menuWrap = () => document.querySelector(".theme-menu");
  const options = () => document.querySelectorAll(".theme-option");
  const toggleBtn = () => document.getElementById("theme-toggle-btn");
  const prefersDark = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(mode) {
    // mode: 'light' | 'dark' | 'system'
    const effective =
      mode === "system" ? (prefersDark() ? "dark" : "light") : mode;

    if (effective === "light") {
      body.setAttribute("data-theme", "light");
      if (icon()) icon().className = "fas fa-moon";
    } else {
      body.removeAttribute("data-theme");
      if (icon()) icon().className = "fas fa-sun";
    }

    // active state in menu
    options().forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-theme") === mode);
    });
  }

  function setTheme(mode) {
    localStorage.setItem(THEME_KEY, mode);
    applyTheme(mode);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "dark";
    applyTheme(saved);

    // react to system changes if mode is system
    if (window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener?.("change", () => {
        const current = localStorage.getItem(THEME_KEY) || "dark";
        if (current === "system") applyTheme("system");
      });
    }
  }

  function initMenu() {
    const wrap = menuWrap();
    const btn = toggleBtn();

    if (!wrap || !btn || !menu()) return;

    // open/close
    btn.addEventListener("click", () => {
      const open = wrap.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });

    // click outside
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // handle choice
    options().forEach((opt) => {
      opt.addEventListener("click", () => {
        const mode = opt.getAttribute("data-theme");
        setTheme(mode);
        wrap.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  window.addEventListener("load", () => {
    initTheme();
    initMenu();
  });
})();

// Mobile menu toggle functionality
(function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  if (mobileMenuToggle && navLinks) {
    // Add styles for mobile menu if not already in CSS
    const style = document.createElement("style");
    style.innerHTML = `
      @media (max-width: 768px) {
        .nav-links.active {
          display: flex !important;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          flex-direction: column;
          gap: 0.5rem;
          background: var(--card-bg);
          backdrop-filter: var(--backdrop-blur);
          border-bottom: 1px solid var(--border-color);
          padding: 1rem;
          z-index: 999;
          max-width: 100%;
        }
        
        .nav-links.active li {
          width: 100%;
        }
        
        .nav-links.active a {
          display: block;
          padding: 0.75rem 1rem;
          text-align: left;
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);

    // Toggle menu on button click
    mobileMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("active");
      mobileMenuToggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("active")
      );
    });

    // Close menu when a link is clicked
    const navLinkItems = navLinks.querySelectorAll("a");
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest("nav")) {
        navLinks.classList.remove("active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove("active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Contact form submission
function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject")?.value || "";
  const message = document.getElementById("message").value;

  // Simulate form submission
  alert(
    `Thank you, ${name}! Your message "${subject}" has been sent successfully. I'll get back to you soon at ${email}.`
  );

  // Reset form
  event.target.reset();
}

// Resume preview
function previewResume() {
  // Open resume in a new tab for preview
  window.open(
    "https://drive.google.com/file/d/1jxBCKO7i1PZKH87BM4etOpfm6JDmomM7/view?usp=sharing",
    "_blank"
  );
}

// Initialize scroll animations
window.addEventListener("scroll", handleScrollAnimations);
window.addEventListener("load", handleScrollAnimations);

// Create particle system
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) {
    console.warn("Particles container not found");
    return;
  }

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
  } else {
    console.warn("Scroll indicator not found");
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

// Global error handler
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled promise rejection:", e.reason);
});
// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  if (body.getAttribute("data-theme") === "light") {
    body.removeAttribute("data-theme");
    themeIcon.className = "fas fa-moon";
  } else {
    body.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-sun";
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Contact form submission
function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject")?.value || "";
  const message = document.getElementById("message").value;

  // Simulate form submission
  alert(
    `Thank you, ${name}! Your message "${subject}" has been sent successfully. I'll get back to you soon at ${email}.`
  );

  // Reset form
  event.target.reset();
}

// Resume preview
function previewResume() {
  // Open resume in a new tab for preview
  window.open(
    "https://drive.google.com/file/d/1jxBCKO7i1PZKH87BM4etOpfm6JDmomM7/view?usp=sharing",
    "_blank"
  );
}

// Initialize scroll animations
window.addEventListener("scroll", handleScrollAnimations);
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
