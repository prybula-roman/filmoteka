import { refs } from './refs';

import { langs } from './localization';

let currentYear = new Date().getFullYear();
document
  .querySelector('#yearpicker')
  .insertAdjacentHTML(
    'beforeend',
    '<option class="filter-input__option current-inputfilter" value="">Choose year</option>',
  );

for (let i = currentYear; i > 1900; i--) {
  refs.yearOptionEl.insertAdjacentHTML(
    'beforeend',
    `<option class="filter-input__option" value="${i}" >${i}</option> `,
  );
}
const inputFilterEl = document.querySelector('.current-inputfilter');
if (langs === 'ru') {
  inputFilterEl.textContent = 'Выбрать год';
}
if (langs === 'uk') {
  inputFilterEl.textContent = 'Обрати рiк';
}
if (langs === 'en') {
  inputFilterEl.textContent = 'Choose year';
}
