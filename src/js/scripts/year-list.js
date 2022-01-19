import { refs } from './refs'

let currentYear = new Date().getFullYear();

for (let i = 1900; i <= currentYear; i++) { 
    refs.yearListEl.insertAdjacentHTML('afterbegin',`<li class="year-list__item" data-id="${i}">${i}</li>`)
}