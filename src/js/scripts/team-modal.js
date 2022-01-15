// import js
import { refs } from './refs';


refs.openTeamModalEl.addEventListener('click', toggleModal);
refs.closeTeamModalEl.addEventListener('click', toggleModal);


  function toggleModal() {
    refs.teamModalEl.classList.toggle('is-hidden');
  }

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseTeamModal();
  }
}


function onCloseTeamModal() {
  // window.removeEventListener('keydown', onEscKeyPress);
  // refs.bodyEl.classList.remove('show-modal');
  // refs.closeTeamModalEl.removeEventListener('click', onCloseTeamModal);
  // refs.teamModalEl.classList.add('js-team-backdrop');
  refs.teamModalEl.classList.toggle('is-hidden');
}


function onTeamBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseTeamModal();
  }
}





