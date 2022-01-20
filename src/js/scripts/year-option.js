import { refs } from './refs'

let currentYear = new Date().getFullYear();

for (let i = 1900; i <= currentYear; i++) { 
    refs.yearOptionEl.insertAdjacentHTML('afterbegin',`<option class="year-input__option" value="year" data-id="${i}">${i}</option> `)
}