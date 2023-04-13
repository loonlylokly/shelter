import { pets } from './pets.js';

const hamburger = document.querySelector('.header__hamburger');
const hamburgerMenu = document.querySelector('.header__mobile');
const overlay = document.querySelector('.overlay');
const menuItems = document.querySelectorAll('.header__mmenu-item');
const cards = document.querySelectorAll('.pets__card');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');
const imgPopup = document.querySelector('.popup__content-img');
const titlePopup = document.querySelector('.popup__content-title');
const subtitlePopup = document.querySelector('.popup__content-subtitle');
const descPopup = document.querySelector('.popup__content-desc');
const propsPopup = document.querySelector('.popup__content-props');
const body = document.body;

function scrollOn() {
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

function scrollOff() {
  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const body = document.body;
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
}

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  hamburgerMenu.classList.toggle('header__mobile-active');
  overlay.classList.toggle('overlay__active');
  if (hamburger.classList[1] === 'active') {
    scrollOff();
  } else {
    scrollOn();
  }
});

overlay.addEventListener('click', function() {
  hamburger.classList.remove('active');
  hamburgerMenu.classList.remove('header__mobile-active');
  overlay.classList.remove('overlay__active');
  popup.classList.remove('popup__active');
  scrollOn();
});

menuItems.forEach((item) => {
  item.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    hamburgerMenu.classList.toggle('header__mobile-active');
    overlay.classList.toggle('overlay__active');
    scrollOn();
  });
});

cards.forEach((item) => {
  item.addEventListener('click', function(e) {
    let currentCard;
    if (e.target.parentNode.className === 'pets__cards-list' ||
      e.target.parentNode.className === 'pets__slider') {
          currentCard = e.target.childNodes[3].innerText
    } else {
      currentCard = e.target.parentNode.childNodes[3].innerText;
    }
    console.log(currentCard, e.target);
    const currentPet = pets.find((item) => item.name === currentCard);
    console.log(pets);
    imgPopup.src = currentPet.img;
    titlePopup.innerText = currentPet.name;
    subtitlePopup.innerText = `${currentPet.type} - ${currentPet.breed}`;
    descPopup.innerText = currentPet.description;
    propsPopup.childNodes[1].innerHTML = `<span><b>Age:</b> ${currentPet.age}</span>`;
    propsPopup.childNodes[3].innerHTML = `<span><b>Inoculations:</b> ${currentPet.inoculations}</span>`;
    propsPopup.childNodes[5].innerHTML = `<span><b>Diseasesge:</b> ${currentPet.diseases}</span>`;
    propsPopup.childNodes[7].innerHTML = `<span><b>Parasites:</b> ${currentPet.parasites}</span>`;
    overlay.classList.toggle('overlay__active');
    popup.classList.toggle('popup__active');
    
    scrollOff();
  });
});

closePopup.addEventListener('click', function() {
  overlay.classList.remove('overlay__active');
  popup.classList.remove('popup__active');
  scrollOn();
});

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});
