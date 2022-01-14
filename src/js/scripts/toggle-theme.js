import { refs } from './refs'

const currentTheme = localStorage.getItem('theme');

refs.checkboxEl.addEventListener('click', toggleTheme);
refs.checkboxEl.addEventListener('click', setLocalStorage);
function toggleTheme(e) {
  refs.bodyEl.classList.toggle('light-theme');
  refs.bodyEl.classList.toggle('dark-theme');
  refs.sectionFooterEl.classList.toggle('light-theme');
  refs.sectionFooterEl.classList.toggle('dark-theme');
}
function setLocalStorage(e) {
  if (refs.checkboxEl.checked) {
    localStorage.setItem('theme', 'dark-theme');
  } else {
    localStorage.setItem('theme', 'light-theme');
  }
}
if (currentTheme === 'dark-theme') {
  refs.bodyEl.classList.add('dark-theme');
  refs.sectionFooterEl.classList.add('dark-theme');
  refs.checkboxEl.checked = true;
}
