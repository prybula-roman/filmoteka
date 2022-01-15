// import js
import { refs } from './refs';


refs.openTeamModalEl.addEventListener('click', onOpenTeamModal);
refs.closeTeamModalEl.addEventListener('click', onCloseTeamModal);


  function onOpenTeamModal() {
    refs.teamModalEl.classList.remove('is-hidden');
}
  
function onCloseTeamModal() {
  refs.teamModalEl.classList.add('is-hidden');
  
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    refs.teamModalEl.classList.add('is-hidden');
  }
}










