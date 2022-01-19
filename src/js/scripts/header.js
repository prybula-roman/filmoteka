import { refs } from './refs';
import onRenderPopularMoviesMarkup from './search';

//////////////////////roman/////////////
import filmCard from '../templates/preview_card.hbs';
import handleMovieCard from './handleMovieCard';
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
  refs.formEl.classList.add('is-hidden');
  refs.libraryListEl.classList.remove('is-hidden');
  refs.homeEl.classList.remove('nav-list__link--current');
  refs.myLibEl.classList.add('nav-list__link--current');

  refs.headerEl.classList.remove('header__container');
  refs.headerEl.classList.add('library-bgi');
  refs.galleryEl.innerHTML = '';
  refs.mainEl.style.minHeight = 'calc(100vh - 80px)';
  refs.paginationEl.classList.add('pagination__off');

  renderLibrary();
}

refs.homeEl.addEventListener('click', onHome);

function onHome() {
  refs.formEl.classList.remove('is-hidden');
  refs.libraryListEl.classList.add('is-hidden');
  refs.homeEl.classList.add('nav-list__link--current');
  refs.myLibEl.classList.remove('nav-list__link--current');
  refs.headerEl.classList.remove('library-bgi');
  refs.headerEl.classList.add('library');
  refs.galleryEl.innerHTML = '';
  onRenderPopularMoviesMarkup();
  refs.formEl.reset();
}

function renderLibrary() {
  const fullName = JSON.parse(localStorage.getItem('authorise')).name;
  const email = JSON.parse(localStorage.getItem('authorise')).email;
  const password = JSON.parse(localStorage.getItem('authorise')).password;
  const newAuth = new Auth(fullName, email, password);
  newAuth
    .loginUser(newAuth.auth, fullName, email, password, newAuth.db)
    .then(() => {
      ///////читаем список фильмов в массив///////////////////////
      console.log('newAuth.currentUser.uid=', newAuth.auth.currentUser.uid);
      get(ref(newAuth.db, 'users/' + newAuth.auth.currentUser.uid + '/filmList'))
        .then(snapshot => {
          console.log('snapshot=', snapshot);
          console.log('snapshot.val()=', snapshot.val());
          let arrFilm = [];
          if (snapshot.exists()) {
            if (snapshot.val() === '') {
              console.log('-----------------------------------');
            } else {
              console.log('====================================');
              console.log('snapshot.val()=', snapshot.val());
              arrFilm = JSON.parse(snapshot.val());
              console.log('arrFilm=', arrFilm);

              arrFilm.forEach(el => {
                console.log('el=', el);
              });

              //  filmCard(handleMovieCard(arrFilm));
            }
          } else {
            console.log('No data available');
          }
        })
        .catch(error => {
          console.error(error.message);
        });

      /////////////////////////////////////////////////////////////////
    })
    .catch(error => {
      alert(error.message);
    });
}
