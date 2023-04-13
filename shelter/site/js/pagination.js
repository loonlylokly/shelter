import { pets } from './pets.js';

const imgCards = document.querySelectorAll('.pets__card-img');
const titleCards = document.querySelectorAll('.pets__card-title')
const btnsArrow = document.querySelectorAll('.btn-arrow');
const btnFirst = btnsArrow[0];
const btnPrev = btnsArrow[1];
const currentPage = btnsArrow[2];
const btnNext = btnsArrow[3];
const btnLast = btnsArrow[4];

let currentPageNumber = 1;
let maxPages = 6;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const ourPets = [];
for (let i = 0; i < maxPages; i++) {
  shuffle(pets)
  ourPets.push([...pets]);
}

function renderPets() {
  imgCards.forEach((item, index) => {
    item.src = ourPets[currentPageNumber-1][index].img;
  });

  titleCards.forEach((item, index) => {
    item.innerText = ourPets[currentPageNumber-1][index].name;
  });
  
  currentPage.innerText = currentPageNumber.toString();
  if (currentPageNumber === 1) {
    btnFirst.classList.add('btn-arrow__disable');
    btnPrev.classList.add('btn-arrow__disable');
    btnNext.classList.remove('btn-arrow__disable');
    btnLast.classList.remove('btn-arrow__disable');
  } else if (currentPageNumber === maxPages) {
    btnNext.classList.add('btn-arrow__disable');
    btnLast.classList.add('btn-arrow__disable');
    btnFirst.classList.remove('btn-arrow__disable');
    btnPrev.classList.remove('btn-arrow__disable');
  } else {
    btnFirst.classList.remove('btn-arrow__disable');
    btnPrev.classList.remove('btn-arrow__disable');
    btnNext.classList.remove('btn-arrow__disable');
    btnLast.classList.remove('btn-arrow__disable');
  }
}


renderPets();

btnFirst.addEventListener('click', () => {
  if (currentPageNumber > 1) {
    currentPageNumber = 1;
    renderPets();
  }
});

btnPrev.addEventListener('click', () => {
  if (currentPageNumber > 1) {
    currentPageNumber--;
    renderPets();
  }
});

btnNext.addEventListener('click', () => {
  if (currentPageNumber < maxPages) {
    currentPageNumber++;
    renderPets();
  }
});

btnLast.addEventListener('click', () => {
  if (currentPageNumber < maxPages) {
    currentPageNumber = maxPages;
    renderPets();
  }
});
