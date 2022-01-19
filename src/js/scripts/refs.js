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

  // gallary section elements
  preloaderEl: document.querySelector('.preloader'),
  mainEl: document.querySelector('main'),
  galleryEl: document.querySelector('.movies'),
  loadMoreBtnEl: document.querySelector('.loadMoreBtn'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),

  // pagination section elements  
  paginationEl: document.querySelector('.pagination'),

  // footer section elements
  footerLinkEl: document.querySelector('.footer__link'),
  footerTextEl: document.querySelector('.footer__text--first'),
  footerEl: document.querySelector('.footer__text--second'),
  sectionFooterEl: document.querySelector('.section--footer'),
    
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
  // yearSearchEl: document.querySelector('.year-search'),
  // genreChoiseEl: document.querySelector('.genre'),
  // categoryGenreListEl: document.querySelector('.category-list'),
  // yearChoiseEl: document.querySelector('.year'),
  // yearListEl: document.querySelector('.year-list'),
  // yearEl: document.querySelector('.year-list__item'),
  // clearBtnEl: document.querySelector('.clear-btn'),
  // genreWrapperEl: document.querySelector('.genre-wrapper'),
  
  // genres
  // genresEl: [
  //   {
  //     "id": 28,
  //     "genre-name": "Action",
  //     "genre-name_ru": "Экшн"
  //   },
  //   {
  //     "id": 12,
  //     "genre-name": "Adventure",
  //     "genre-name_ru": "Приключения"
  //   },
  //   {
  //     "id": 16,
  //     "genre-name": "Animation",
  //     "genre-name_ru": "Анимационный"
  //   },
  //   {
  //     "id": 35,
  //     "genre-name": "Comedy",
  //     "genre-name_ru": "Комедии"
  //   },
  //   {
  //     "id": 80,
  //     "genre-name": "Crime",
  //     "genre-name_ru": "Криминал"
  //   },
  //   {
  //     "id": 99,
  //     "genre-name": "Documentary",
  //     "genre-name_ru": "Документальные"
  //   },
  //   {
  //     "id": 18,
  //     "genre-name": "Drama",
  //     "genre-name_ru": "Драма"
  //   },
  //   {
  //     "id": 10751,
  //     "genre-name": "Family",
  //     "genre-name_ru": "Семейные"
  //   },
  //   {
  //     "id": 14,
  //     "genre-name": "Fantasy",
  //     "genre-name_ru": "Фантасктика"
  //   },
  //   {
  //     "id": 36,
  //     "genre-name": "History",
  //     "genre-name_ru": "Исторические"
  //   },
  //   {
  //     "id": 27,
  //     "genre-name": "Horror",
  //     "genre-name_ru": "Хоррор"
  //   },
  //   {
  //     "id": 10402,
  //     "genre-name": "Music",
  //     "genre-name_ru": "Музыка"
  //   },
  //   {
  //     "id": 9648,
  //     "genre-name": "Mystery",
  //     "genre-name_ru": "Мистика"
  //   },
  //   {
  //     "id": 10749,
  //     "genre-name": "Romance",
  //     "genre-name_ru": "Мелодрама"
  //   },
  //   {
  //     "id": 878,
  //     "genre-name": "Science Fiction",
  //     "genre-name_ru": "Научная фантастика"
  //   },
  //   {
  //     "id": 10770,
  //     "genre-name": "TV Movie",
  //     "genre-name_ru": "Сериал"
  //   },
  //   {
  //     "id": 53,
  //     "genre-name": "Thriller",
  //     "genre-name_ru": "Триллер"
  //   },
  //   {
  //     "id": 10752,
  //     "genre-name": "War",
  //     "genre-name_ru": "Война"
  //   },
  //   {
  //     "id": 37,
  //     "genre-name": "Western",
  //     "genre-name_ru": "Вестерн"
  //   }
  // ],
};

export { refs };