// import js
import { refs } from './refs';

// import templates
import movieCard from '../templates/modal.hbs';
import trailer from '../API/fetchTrailer';
import { currentTheme } from './toggle-theme';

refs.openModalEl.addEventListener('click', onOpenModal);
refs.backdropEl.addEventListener('click', onBackdropClick);

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onCloseModal() {
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

  if ( currentTheme === 'dark-theme') {
    refs.modalWindowEl.classList.add('dark-theme');
   } else {
     refs.modalWindowEl.classList.remove('dark-theme'); 
   }
  window.addEventListener('keydown', onEscKeyPress);
  refs.closeModalEl.addEventListener('click', onCloseModal);

  if (e.target.classList.value === 'movies') {
  return
  }

  const currentFilmId = Number(e.target.closest('li').id);

  return JSON.parse(localStorage.getItem("currentPage")).map(films => {
   films.forEach(film => {
     if (currentFilmId === film.id ) {
        
      const markupModal = movieCard(film);
      
      refs.modalmarkupEl.innerHTML = '';
      refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
      refs.bodyEl.classList.add('show-modal');

    //onPlayTrailer
        trailer.onPlayTrailer(document.querySelectorAll('.playTrailer'));
        }  
     })
  })
}