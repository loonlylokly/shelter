import { pets } from './pets.js';

const carusel = document.querySelector('.pets__carusel');
const btnArrow = document.querySelectorAll('.btn-arrow');
const btnPrev = btnArrow[0];
const btnNext = btnArrow[1];

carusel.removeChild(carusel.childNodes[6]);
carusel.removeChild(carusel.childNodes[4]);
carusel.removeChild(carusel.childNodes[2]);
carusel.removeChild(carusel.childNodes[0]);

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

btnNext.addEventListener('click', () => {
  carusel.childNodes[1].classList.add('pets__cards-list-left');
  carusel.childNodes[2].classList.remove('pets__cards-list-right');
  carusel.removeChild(carusel.childNodes[0]);
  carusel.append(carusel.childNodes[1].cloneNode(true));
  carusel.childNodes[2].classList.add('pets__cards-list-right');
  shuffle(pets);
  for (let i = 1; i < 6; i+=2) {
    carusel.childNodes[2].childNodes[i].childNodes[1].src = pets[i].img;
    carusel.childNodes[2].childNodes[i].childNodes[3].src = pets[i].name;
  }
});

btnPrev.addEventListener('click', () => {
  carusel.insertBefore(carusel.childNodes[0].cloneNode(true), carusel.childNodes[0]);
  carusel.childNodes[1].classList.remove('pets__cards-list-left');
  carusel.childNodes[2].classList.add('pets__cards-list-right');
  carusel.removeChild(carusel.childNodes[3]);
  shuffle(pets);
  for (let i = 1; i < 6; i+=2) {
    carusel.childNodes[0].childNodes[i].childNodes[1].src = pets[i].img;
    carusel.childNodes[0].childNodes[i].childNodes[3].src = pets[i].name;
  }
});

