document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuNav = document.querySelector(".derecha ul");
  
    menuToggle.addEventListener("click", function () {
      menuNav.classList.toggle("show-menu");
    });
  });