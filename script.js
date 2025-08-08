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
