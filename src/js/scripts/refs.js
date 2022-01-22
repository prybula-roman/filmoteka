const refs = {
  // header section elements
  homeEl: document.querySelector('#home-link'),
  myLibEl: document.querySelector('#library-link'),
  watchedEl: document.querySelector('.watched__button'),
  queueEl: document.querySelector('.queue__button'),
  formEl: document.querySelector('.search-form'),
  libraryListEl: document.querySelector('.library'),
  headerEl: document.querySelector('.header'),
  inputEl: document.querySelector('.search-form__input'),
  errorEl: document.querySelector('.notification'),
  searchError: document.querySelector('.notification__text'),

  // gallary section elements
  preloaderEl: document.querySelector('.preloader'),
  mainEl: document.querySelector('main'),
  galleryEl: document.querySelector('.movies'),
  loadMoreBtnEl: document.querySelector('.loadMoreBtn'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),

  // pagination section elements
  paginationEl: document.querySelector('.pagination'),

  // footer section elements
  footerTeamLinkEl: document.querySelector('.footer__link'),
  // footerTextEl: document.querySelector('.footer__text--first'),
  // footerEl: document.querySelector('.footer__text--second'),
  sectionFooterEl: document.querySelector('.section--footer'),

  // team-modal
  openTeamModalEl: document.querySelector('[data-team-modal-open]'),
  closeTeamModalEl: document.querySelector('[data-team-modal-close]'),
  teamModalEl: document.querySelector('[data-team-modal]'),
  teamBackdropEl: document.querySelector('.team-backdrop'),
  peopleEl: document.querySelector('.people'),

  // modal
  openModalEl: document.querySelector('[data-modal-open]'),
  closeModalEl: document.querySelector('[data-modal-close]'),
  modalEl: document.querySelector('[data-modal]'),
  modalmarkupEl: document.querySelector('.modal__markup'),
  bodyEl: document.querySelector('body'),
  backdropEl: document.querySelector('.js-backdrop'),
  trailerEl: document.querySelector('.trailer'),
  modalWindowEl: document.querySelector('.modal'),

  // spinner
  spinner: document.querySelector('.spinner'),

  // to top button
  toTopButtonEl: document.querySelector('.toTopButton'),

  // theme(day/night)
  checkboxEl: document.getElementById('checkbox'),

  // filter
  filterTextEl: document.querySelector('.filter-text'),
  selectEl: document.querySelector('.filter-input'),
  optionEl: document.querySelector('option'),
      

  // location
  enEl: document.querySelector('#englishLink'),
  ruEl: document.querySelector('#russianLink'),
  ukEl: document.querySelector('#ukrainianLink'),
 
};

export { refs };
 console.log(refs.selectEl)