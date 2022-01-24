import { refs } from './refs'

let currentYear = new Date().getFullYear();
  refs.yearPickerEl.insertAdjacentHTML(
    'beforeend','<option class="filter-input__option" value="">Choose year</option>',
  );

for (let i = currentYear; i > 1900; i--) { 
    refs.yearPickerEl.insertAdjacentHTML('beforeend',`<option class="filter-input__option" value="${i}" >${i}</option> `)
}