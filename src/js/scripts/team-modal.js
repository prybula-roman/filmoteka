// import js
import { refs } from './refs';

refs.openTeamModalEl.addEventListener('click', onOpenTeamModal);
refs.backdropEl.addEventListener('click', onBackdropClick);


function onOpenTeamModal(e) {
  e.preventDefault();
}

function onCloseTeamModal() {
  refs.closeTeamModalEl.removeEventListener('click', onCloseTeamModal);
  refs.teamModalEl.classList.add('js-backdrop');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseTeamModal();
  }
}




