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
function previewResume() {
  window.open(
    "https://drive.google.com/file/d/1jxBCKO7i1PZKH87BM4etOpfm6JDmomM7/view?usp=sharing",
    "_blank"
  );
