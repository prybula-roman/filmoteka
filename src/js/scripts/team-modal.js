// import js
import { refs } from './refs';

refs.openTeamModalEl.addEventListener('click', onOpenTeamModal);
refs.teamBackdropEl.addEventListener('click', onTeamBackdropClick);


function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseTeamModal();
  }
}


function onCloseTeamModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  // refs.bodyEl.classList.remove('show-modal');
  refs.closeTeamModalEl.removeEventListener('click', onCloseTeamModal);
  refs.teamModalEl.classList.add('js-team-backdrop');
}


function onTeamBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseTeamModal();
  }
}

function onOpenTeamModal(e) {
  e.preventDefault();

  window.addEventListener('keydown', onEscKeyPress);
  refs.closeTeamModalEl.addEventListener('click', onCloseTeamModal);

}




