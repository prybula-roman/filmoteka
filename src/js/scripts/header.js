import { refs } from './refs';


//refs.libraryLink.addEventListener('click', clickOnLibrary);
//refs.homeLink.addEventListener('click', clickOnHome);


function clickOnLibrary() {

    refs.homeLink.classList.remove('nav-list__link--current');
    refs.libraryLink.classList.add('nav-list__link--current');
    refs.headerEl.classList.add('library');
    refs.headerEl.classList.remove('header__container');
    refs.searchEl.classList.add('is-hidden');
    refs.btnsEl.classList.remove('is-hidden');
}

function clickOnHome() {

    refs.headerEl.classList.remove('library');
    refs.homeLink.classList.add('nav-list__link--current');
    refs.libraryLink.classList.remove('nav-list__link--current');
    refs.btnsEl.classList.add('is-hidden');
    refs.searchEl.classList.remove('is-hidden');
}