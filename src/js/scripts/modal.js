// import js
import { refs } from './refs';

// import templates
import movieCard from '../templates/modal.hbs';
import { handleModalMovieCard } from './handleModalMovieCard';
// import trailer from '../API/fetchTrailer';

import { currentTheme } from './toggle-theme';
import { changeModalLanguage } from './localization';
import { langs } from './localization';
//////////////////////roman/////////////
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import Auth from './authForm/auth';
import {
  btnAddFilmClicked,
  btnDelFilmClicked,
  btnDelQueueClicked,
  btnAddQueueClicked,
} from './authForm/authentic';
import Notiflix from 'notiflix';
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

export function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onOpenModal(e) {
  //console.log("onOpenModal()----------------->")
  
  e.preventDefault();
  if(refs.GLOBAL_IS_LIB || refs.GLOBAL_IS_QUE){
   // Notiflix.Notify.failure("refs.GLOBAL_IS_LIB || refs.GLOBAL_IS_QUE -->return")
    //console.log("return from onOpenModal()<----------------")
    return;}

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
        markupModal = movieCard(handleModalMovieCard(film));
        refs.modalmarkupEl.innerHTML = '';
        refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
        refs.bodyEl.classList.add('show-modal');
        changeModalLanguage();
        ///////////////////////Не трогать, сам уберу  p.s. Роман///////////////////////////////////////////////////
        //--------------------------------------------------------------
        let btnAdd = document.querySelector('.currentLang-addWatched');
        btnAdd.innerHTML = refs.nameBtnAddWatch;
        let btnQueue = document.querySelector('.currentLang-addQueue');
        btnQueue.innerHTML = refs.nameBtnAddQueue;

        // btnAdd.innerHTML = refs.nameBtnAddWatch;
        if (langs === 'ru') {
          btnAdd.textContent = refs.nameBtnAddWatchRu;
        }
        if (langs === 'uk') {
          btnAdd.textContent = refs.nameBtnAddWatchUa;
        }
        if (langs === 'en') {
          btnAdd.textContent = refs.nameBtnAddWatch;
        }
        // let btnQueue = document.querySelector('.currentLang-addQueue');
        // btnQueue.innerHTML = refs.nameBtnAddQueue;

        if (langs === 'ru') {
          btnQueue.textContent = refs.nameBtnAddQueueRu;
        }
        if (langs === 'uk') {
          btnQueue.textContent = refs.nameBtnAddQueueUa;
        }
        if (langs === 'en') {
          btnQueue.textContent = refs.nameBtnAddQueue;
        }

        const newAuth = new Auth();
        //------------------------------------------------
        newAuth.findFilm(film, btnAdd, `/filmList`);
        newAuth.findFilm(film, btnQueue, `/queueList`);
        //--------------------------------------------------------
        btnAdd.addEventListener('click', () => {
          if (
            btnAdd.textContent === refs.nameBtnDelWatch ||
            btnAdd.textContent === refs.nameBtnDelWatchRu ||
            btnAdd.textContent === refs.nameBtnDelWatchUa
          ) {
            btnDelFilmClicked(film);
          } else {
            btnAddFilmClicked(film);
          }
        });
        //-------------------------------------------------------------
        btnQueue.addEventListener('click', e => {
          //console.log('e=', e);
          if (
            btnQueue.textContent === refs.nameBtnDelQueue ||
            btnQueue.textContent === refs.nameBtnDelQueueRu ||
            btnQueue.textContent === refs.nameBtnDelQueueUa
          ) {
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
  //console.log("onOpenModal()<----------------")
}
export { onOpenModal };
