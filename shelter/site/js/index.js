const hamburger = document.querySelector('.header__hamburger');
const hamburgerMenu = document.querySelector('.header__mobile');
const overlay = document.querySelector('.overlay');
const menuItems = document.querySelectorAll('.header__mmenu-item');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  hamburgerMenu.classList.toggle('header__mobile-active');
  overlay.classList.toggle('overlay__active');
});

overlay.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  hamburgerMenu.classList.toggle('header__mobile-active');
  overlay.classList.toggle('overlay__active');
});

menuItems.forEach((item) => {
  item.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    hamburgerMenu.classList.toggle('header__mobile-active');
    overlay.classList.toggle('overlay__active');
  });
});
