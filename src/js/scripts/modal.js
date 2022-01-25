// import js
import { refs } from './refs';

// import templates
import movieCard from '../templates/modal.hbs';
// import trailer from '../API/fetchTrailer';

import { currentTheme } from './toggle-theme';
// import { changeModalLanguage } from './localization';
//////////////////////roman/////////////
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   currentUser,
//   signOut,
// } from 'firebase/auth';
// import { getDatabase, ref, set, get, child, update } from 'firebase/database';
// import Auth from './authForm/auth';
import {
  btnAddFilmClicked,
  btnDelFilmClicked,
  btnDelQueueClicked,
  btnAddQueueClicked,
} from './authForm/authentic';

////////////////////////////////////////

refs.openModalEl.addEventListener('click', onOpenModal);
refs.backdropEl.addEventListener('click', onBackdropClick);

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

export function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.bodyEl.classList.remove('show-modal');
  refs.closeModalEl.removeEventListener('click', onCloseModal);
  refs.modalEl.classList.add('js-backdrop');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onOpenModal(e) {
  e.preventDefault();

  if (currentTheme === 'dark-theme') {
    refs.modalWindowEl.classList.add('dark-theme');
  } else {
    refs.modalWindowEl.classList.remove('dark-theme');
  }
  window.addEventListener('keydown', onEscKeyPress);
  refs.closeModalEl.addEventListener('click', onCloseModal);

  if (e.target.classList.value === 'movies__thumb') {
    return;
  }
  const currentFilmId = Number(e.target.closest('li').id);
  return JSON.parse(localStorage.getItem('currentPage')).map(films => {
    films.forEach(film => {
      if (currentFilmId === film.id) {
        let markupModal = null;
        markupModal = movieCard(film);
        refs.modalmarkupEl.innerHTML = '';
        refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
        refs.bodyEl.classList.add('show-modal');
        ///////////////////////Не трогать, сам уберу  p.s. Роман///////////////////////////////////////////////////
        //--------------------------------------------------------------
        let btnAdd = document.querySelector('.currentLang-addWatched');
        btnAdd.innerHTML = 'ADD TO WATCHED';
        let btnQueue = document.querySelector('.currentLang-addQueue');
        btnQueue.innerHTML = 'ADD TO QUEUE';
        const newAuth = new Auth();
        //------------------------------------------------
        newAuth.findFilm(film, btnAdd, `/filmList`);
        newAuth.findFilm(film, btnQueue, `/queueList`);
        //--------------------------------------------------------
        btnAdd.addEventListener('click', () => {
          if (btnAdd.textContent === 'DELETE WATCHED') {
            btnDelFilmClicked(film);
          } else {
            btnAddFilmClicked(film);
          }
        });
        //-------------------------------------------------------------
        btnQueue.addEventListener('click', e => {
          console.log('e=', e);
          if (btnQueue.textContent === 'DELETE QUEUE') {
            btnDelQueueClicked(film);
          } else {
            btnAddQueueClicked(film);
          }
        });
        //--------------------------------------------------------------
        ////////////////////конец p.s. Рома //////////////////////////////
      }
    });
  });
}
export { onOpenModal };
