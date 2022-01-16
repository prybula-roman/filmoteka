
// import js
import { refs } from './refs';

// import templates
import teamCard from './templates/teamtemplate.hbs';
import team from './templates/team.json'

refs.openTeamModalEl.addEventListener('click', onOpenTeamModal);
refs.closeTeamModalEl.addEventListener('click', onCloseTeamModal);
refs.teamBackdropEl.addEventListener('click', onBackdropClick);

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseTeamModal();
  }
}

function onCloseTeamModal() {
  refs.teamModalEl.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
  refs.bodyEl.classList.remove('show-modal');
  refs.closeTeamModalEl.removeEventListener('click', onCloseTeamModal);
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseTeamModal();
  }
}

  function onOpenTeamModal(event) {
    event.preventDefault();
    window.addEventListener('keydown', onEscKeyPress);
    refs.teamModalEl.classList.remove('is-hidden');
    refs.closeTeamModalEl.addEventListener('click', onCloseTeamModal);
    const markupTeam = teamCard(team);
    refs.galleryEl.insertAdjacentHTML('beforeend', markupTeam);
}
  









