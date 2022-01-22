import { refs } from './refs'

let currentYear = new Date().getFullYear();
document.querySelector('#yearpicker').insertAdjacentHTML(
    'beforeend','<option class="filter-input__option" value="">Choose year</option>',
  );

for (let i = currentYear; i > 1900; i--) { 
    refs.yearOptionEl.insertAdjacentHTML('beforeend',`<option class="filter-input__option" value="${i}" >${i}</option> `)
}