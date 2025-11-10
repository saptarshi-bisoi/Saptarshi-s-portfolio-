// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  if (body.getAttribute("data-theme") === "light") {
    // Switch to dark mode
    body.removeAttribute("data-theme");
    themeIcon.className = "fas fa-sun";
    localStorage.setItem("theme", "dark");
  } else {
    // Switch to light mode
    body.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-moon";
    localStorage.setItem("theme", "light");
  }
}

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");

  if (savedTheme === "light") {
    body.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-moon";
  } else {
    // Default to dark mode
    body.removeAttribute("data-theme");
    themeIcon.className = "fas fa-sun";
  }
}

// Initialize theme when page loads
window.addEventListener("load", initializeTheme);

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
