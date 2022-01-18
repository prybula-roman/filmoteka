import { refs } from './refs';


refs.errorEl.addEventListener('click', clickOnLibrary);
refs.errorEl.addEventListener('click', clickOnHome);


function clickOnLibrary() {

    refs.errorEl.classList.remove('nav-list__link--current');
    refs.errorEl.classList.add('nav-list__link--current');
    refs.headerEl.classList.add('library');
    refs.headerEl.classList.remove('header__container');
    refs.searchEl.classList.add('is-hidden');
    refs.btnsEl.classList.remove('is-hidden');
}

function clickOnHome() {

    refs.headerEl.classList.remove('library');
    refs.errorEl.classList.add('nav-list__link--current');
    refs.errorEl.classList.remove('nav-list__link--current');
    refs.btnsEl.classList.add('is-hidden');
    refs.searchEl.classList.remove('is-hidden');
}