// import JS
import { refs } from './refs';

console.log(refs.logoutEl)

// if ( refs.formEl.classList.contains('is-hidden')) {
//   refs.wrapperSwiperEl.classList.add("is-hidden")
// }

// import onRenderPopularMoviesMarkup from './search';

// refs.myLibEl.addEventListener('click', onMyLibrary);
// function onMyLibrary() {
//   refs.formEl.classList.add('is-hidden');
//   refs.libraryListEl.classList.remove('is-hidden');
//   refs.homeEl.classList.remove('nav-list__link--current');
//   refs.myLibEl.classList.add('nav-list__link--current');
//   refs.headerEl.classList.add('page-header__library');
//   refs.galleryEl.innerHTML = '';
//   refs.mainEl.style.minHeight = 'calc(100vh - 80px)';
//   refs.paginationEl.classList.add('pagination__off');
// }

// refs.homeEl.addEventListener('click', onHome);
// function onHome() {
//   refs.formEl.classList.remove('is-hidden');
//   refs.libraryListEl.classList.add('is-hidden');
//   refs.homeEl.classList.add('nav-list__link--current');
//   refs.myLibEl.classList.remove('nav-list__link--current');
//   refs.headerEl.classList.remove('page-header__library');
//   refs.galleryEl.innerHTML = '';
//   onRenderPopularMoviesMarkup();
//   refs.formEl.reset()
// } 