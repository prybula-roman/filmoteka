import { refs } from './refs';
import onRenderPopularMoviesMarkup from './search';

//////////////////////roman/////////////
import filmCard from '../templates/preview_card.hbs';
import handleMovieCard from './handleMovieCard';
import { handleModalMovieCard } from './handleModalMovieCard';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import Auth from './authForm/auth';

////////////////////////////////////////

refs.myLibEl.addEventListener('click', onMyLibrary);

function onMyLibrary() {
  refs.wrapperSwiperEl.classList.add('is-hidden');
  refs.filterEl.style.display = 'none';
  refs.formEl.classList.add('is-hidden');
  refs.libraryListEl.classList.remove('is-hidden');
  refs.homeEl.classList.remove('nav-list__link--current');
  refs.myLibEl.classList.add('nav-list__link--current');
  refs.headerEl.classList.remove('header__container');
  refs.headerEl.classList.add('library-bgi');
  refs.galleryEl.innerHTML = '';
  refs.paginationEl.classList.add('pagination__off');
  refs.errorEl.classList.add('visually-hidden');
  //////////////////////////////////////////////////////////////////////////
  //------------------------------------------------
  const listCards = document.querySelector('.movies');
  listCards.classList.toggle('my-library-movies');
  if (document.querySelector('.my-library-movies')) {
    renderLibrary();
  }
  //-----------------------------------------------
  const btnWatched = refs.watchedEl;
  btnWatched.addEventListener('click', renderLibrary);
  //-----------------------------------------------
  const btnQueue = refs.queueEl;
  btnQueue.addEventListener('click', renderQueue);

  //-----------------------------------------------

  //////////////////////////////////////////////////////////////////////////
}

refs.homeEl.addEventListener('click', onHome);
onRenderPopularMoviesMarkup();
function onHome() {
  console.log('onHome()   refs.GLOBAL_IS_LIB=', refs.GLOBAL_IS_LIB);
  console.log('onHome()   refs.GLOBAL_IS_QUE=', refs.GLOBAL_IS_QUE);
  refs.filterEl.style.display = 'flex';
  refs.formEl.classList.remove('is-hidden');
  refs.libraryListEl.classList.add('is-hidden');
  refs.homeEl.classList.add('nav-list__link--current');
  refs.myLibEl.classList.remove('nav-list__link--current');
  refs.headerEl.classList.remove('library-bgi');
  refs.headerEl.classList.add('library');
  refs.galleryEl.innerHTML = '';
  refs.noMoviesEl.classList.add('visually-hidden');
  onRenderPopularMoviesMarkup();
  refs.formEl.reset();
  console.log(document.querySelector('.movies'));
  document.querySelector('.movies').classList.toggle('my-library-movies');
  refs.wrapperSwiperEl.classList.remove('is-hidden');

  ///////////////////////////////////////
  refs.GLOBAL_IS_QUE = false;
  refs.GLOBAL_IS_LIB = false;
  ///////////////////////////////////////
}

function renderLibrary() {
  console.log('renderLibrary()');
  const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
  const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
  const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
  const newAuth = new Auth(fullName, email, password);
  refs.GLOBAL_IS_LIB = true;
  refs.GLOBAL_IS_QUE = false;
  get(ref(newAuth.db, 'users/' + newAuth.auth.currentUser.uid + '/filmList'))
    .then(snapshot => {
      // console.log('renderLibrary()  snapshot=', snapshot);
      let arrFilm = [];
      // let arrFilm = new Array();
      console.log('arrFilm=', typeof arrFilm);
      if (snapshot.exists()) {
        //--------------------------------
        if (!refs.watchedEl.classList.contains('btn-activ')) {
          refs.watchedEl.classList.add('btn-activ');
        }
        if (refs.queueEl.classList.contains('btn-activ')) {
          refs.queueEl.classList.remove('btn-activ');
        }
        //----------------------------------
        const listCards = document.querySelector('.movies');
        if (JSON.parse(snapshot.val()).length === 0) {
          listCards.innerHTML = '';
          refs.noMoviesEl.classList.remove('visually-hidden');
          listCards.innerHTML = '';
          // console.log('Nothig do');
        } else {
          refs.noMoviesEl.classList.add('visually-hidden');
          arrFilm = JSON.parse(snapshot.val());
          listCards.innerHTML = '';
          listCards.insertAdjacentHTML('beforeend', filmCard(handleMovieCard(arrFilm)));
        }
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}

function renderQueue() {
  console.log('-------------renderQueue()');
  const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
  const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
  const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
  const newAuth = new Auth(fullName, email, password);
  refs.GLOBAL_IS_LIB = false;
  refs.GLOBAL_IS_QUE = true;
  get(ref(newAuth.db, 'users/' + newAuth.auth.currentUser.uid + '/queueList'))
    .then(snapshot => {
      console.log('renderQueue()  snapshot=', snapshot);

      if (snapshot.exists()) {
        let arrFilm = [];
        //--------------------------------
        if (refs.watchedEl.classList.contains('btn-activ')) {
          refs.watchedEl.classList.remove('btn-activ');
        }
        if (!refs.queueEl.classList.contains('btn-activ')) {
          refs.queueEl.classList.add('btn-activ');
        }

        //----------------------------------
        const listCards = document.querySelector('.movies');
        if (JSON.parse(snapshot.val()).length === 0) {
          refs.noMoviesEl.classList.remove('visually-hidden');
          listCards.innerHTML = '';
          console.log('Nothig do');
        } else {
          refs.noMoviesEl.classList.add('visually-hidden');
          arrFilm = JSON.parse(snapshot.val());

          listCards.innerHTML = '';
          listCards.insertAdjacentHTML('beforeend', filmCard(handleMovieCard(arrFilm)));
          console.log('renderQueue()  arrFilm=', arrFilm);
        }
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}

export { onHome };
