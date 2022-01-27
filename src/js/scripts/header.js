import { refs } from './refs';
import onRenderPopularMoviesMarkup from './search';
import {onBackdropClick,onOpenModal} from './modal';
//////////////////////roman/////////////
import filmCard from '../templates/preview_card.hbs';
import handleMovieCard from './handleMovieCard';
import handleMovieCardLS from './handleMovieCardLS';
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
import movieCard from '../templates/modal.hbs';

import { changeModalLanguage } from './localization';
import {
  btnAddFilmClicked,
  btnDelFilmClicked,
  btnDelQueueClicked,
  btnAddQueueClicked,
} from './authForm/authentic';
import { langs } from './localization';
import Notiflix from 'notiflix';
////////////////////////////////////////

refs.myLibEl.addEventListener('click', onMyLibrary);

function onMyLibrary() {
  refs.langWrapEl.classList.add('visually-hidden');
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
  refs.GLOBAL_IS_QUE = false;
  refs.GLOBAL_IS_LIB = true;
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
  refs.langWrapEl.classList.remove('visually-hidden');
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
  console.log('renderLibrary()-------------------------->>>>>>>>>>>>>>>');
  if(!refs.GLOBAL_IS_LIB && !refs.GLOBAL_IS_QUE){
    Notiflix.Notify.failure("!refs.GLOBAL_IS_LIB || !refs.GLOBAL_IS_QUE -->return")
    console.log('renderLibrary()<<<<<<<<<<<--------------------------')
return;
  }
  const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
  const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
  const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
  const newAuth = new Auth(fullName, email, password);
  refs.GLOBAL_IS_LIB = true;
  refs.GLOBAL_IS_QUE = false;
  get(ref(newAuth.db, 'users/' + newAuth.auth.currentUser.uid + '/filmList'))
    .then(snapshot => {
      console.log('renderLibrary()  snapshot.val()=', snapshot.val());
      console.log(JSON.parse(snapshot.val()))  
      let arrFilm = [];
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
          console.log('Nothig do');
        } else {
          refs.noMoviesEl.classList.add('visually-hidden');
         
          console.log("arrFilm=",JSON.parse(snapshot.val()))
          listCards.innerHTML = '';
          listCards.insertAdjacentHTML('beforeend', filmCard(handleMovieCardLS( JSON.parse(snapshot.val()))));
          
          listenClickCard( JSON.parse(snapshot.val()));
         
          console.log('renderLibrary()<<<<<<<<<<<<<<<<<<--------------------------');
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


          ///------------------------------------------------------------
          refs.openModalEl.addEventListener('click', /*onOpenModal*/(e)=>{
            console.log("refs.openModalEl  clicked")
            const currentFilmId = Number(e.target.closest('li').id);
            console.log("currentFilmId=",currentFilmId);
arrFilm.forEach(film=>{
  if (currentFilmId === film.id) {
    let markupModal = null;
    markupModal = movieCard(handleModalMovieCard(film));
    refs.modalmarkupEl.innerHTML = '';
    refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
    refs.bodyEl.classList.add('show-modal');
    changeModalLanguage();

///////////////////////Не трогать, сам уберу  p.s. Роман///////////////////////////////////////////////////
        //--------------------------------------------------------------
        let btnAdd = document.querySelector('.currentLang-addWatched');
        btnAdd.innerHTML = refs.nameBtnAddWatch;
        let btnQueue = document.querySelector('.currentLang-addQueue');
        btnQueue.innerHTML = refs.nameBtnAddQueue;

        // btnAdd.innerHTML = refs.nameBtnAddWatch;
        if (langs === 'ru') {
          btnAdd.textContent = refs.nameBtnAddWatchRu;
        }
        if (langs === 'uk') {
          btnAdd.textContent = refs.nameBtnAddWatchUa;
        }
        if (langs === 'en') {
          btnAdd.textContent = refs.nameBtnAddWatch;
        }
        // let btnQueue = document.querySelector('.currentLang-addQueue');
        // btnQueue.innerHTML = refs.nameBtnAddQueue;

        if (langs === 'ru') {
          btnQueue.textContent = refs.nameBtnAddQueueRu;
        }
        if (langs === 'uk') {
          btnQueue.textContent = refs.nameBtnAddQueueUa;
        }
        if (langs === 'en') {
          btnQueue.textContent = refs.nameBtnAddQueue;
        }

        const newAuth = new Auth();
        //------------------------------------------------
        newAuth.findFilm(film, btnAdd, `/filmList`);
        newAuth.findFilm(film, btnQueue, `/queueList`);
        //--------------------------------------------------------
        btnAdd.addEventListener('click', () => {
          if (
            btnAdd.textContent === refs.nameBtnDelWatch ||
            btnAdd.textContent === refs.nameBtnDelWatchRu ||
            btnAdd.textContent === refs.nameBtnDelWatchUa
          ) {
            btnDelFilmClicked(film);
          } else {
            btnAddFilmClicked(film);
          }
        });
        //-------------------------------------------------------------
        btnQueue.addEventListener('click', e => {
          console.log('e=', e);
          if (
            btnQueue.textContent === refs.nameBtnDelQueue ||
            btnQueue.textContent === refs.nameBtnDelQueueRu ||
            btnQueue.textContent === refs.nameBtnDelQueueUa
          ) {
            btnDelQueueClicked(film);
          } else {
            btnAddQueueClicked(film);
          }
        });
        //--------------------------------------------------------------
        ////////////////////конец p.s. Рома //////////////////////////////


  }

})
          });
          //<------------------------------
       //   refs.backdropEl.addEventListener('click', /*onBackdropClick*/);
          for(let i=0;i!=arrFilm.length;i++){
            console.log(`arrFilm[${i}]=`,arrFilm[i])
          }
          console.log('renderLibrary()  arrFilm=', arrFilm);
        // listCards.insertAdjacentHTML('beforeend', filmCard(arrFilm));
  //----------------------------------------------------------------------------
        }
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}


function listenClickCard(arrFilm){ 
  console.log("listenClickCard()---------------->")
  refs.openModalEl.addEventListener('click', /*onOpenModal*/(e)=>{
  console.log("refs.openModalEl  clicked")
  console.log("refs.openModalEl  e=",e)
  const currentFilmId = Number(e.target.closest('li').id);
  console.log("currentFilmId=",currentFilmId);
  
arrFilm.forEach(film=>{
if (currentFilmId === film.id) {
let markupModal = null;
markupModal = movieCard(handleModalMovieCard(film));
console.log("markupModal=",markupModal)
refs.modalmarkupEl.innerHTML = '';
 refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
refs.bodyEl.classList.add('show-modal');
changeModalLanguage();

///////////////////////Не трогать, сам уберу  p.s. Роман///////////////////////////////////////////////////
//--------------------------------------------------------------
let btnAdd = document.querySelector('.currentLang-addWatched');
btnAdd.innerHTML = refs.nameBtnAddWatch;
let btnQueue = document.querySelector('.currentLang-addQueue');
btnQueue.innerHTML = refs.nameBtnAddQueue;

// btnAdd.innerHTML = refs.nameBtnAddWatch;
if (langs === 'ru') {
btnAdd.textContent = refs.nameBtnAddWatchRu;
}
if (langs === 'uk') {
btnAdd.textContent = refs.nameBtnAddWatchUa;
}
if (langs === 'en') {
btnAdd.textContent = refs.nameBtnAddWatch;
}
// let btnQueue = document.querySelector('.currentLang-addQueue');
// btnQueue.innerHTML = refs.nameBtnAddQueue;

if (langs === 'ru') {
btnQueue.textContent = refs.nameBtnAddQueueRu;
}
if (langs === 'uk') {
btnQueue.textContent = refs.nameBtnAddQueueUa;
}
if (langs === 'en') {
btnQueue.textContent = refs.nameBtnAddQueue;
}

const newAuth = new Auth();
//------------------------------------------------
newAuth.findFilm(film, btnAdd, `/filmList`);
newAuth.findFilm(film, btnQueue, `/queueList`);
//--------------------------------------------------------
btnAdd.addEventListener('click', () => {
if (
  btnAdd.textContent === refs.nameBtnDelWatch ||
  btnAdd.textContent === refs.nameBtnDelWatchRu ||
  btnAdd.textContent === refs.nameBtnDelWatchUa
) {
  btnDelFilmClicked(film);
} else {
  btnAddFilmClicked(film);
}
});
//-------------------------------------------------------------
btnQueue.addEventListener('click', e => {
console.log('e=', e);
if (
  btnQueue.textContent === refs.nameBtnDelQueue ||
  btnQueue.textContent === refs.nameBtnDelQueueRu ||
  btnQueue.textContent === refs.nameBtnDelQueueUa
) {
  btnDelQueueClicked(film);
} else {
  btnAddQueueClicked(film);
}
});
//--------------------------------------------------------------
////////////////////конец p.s. Рома //////////////////////////////
}
})
});
console.log("listenClickCard()<----------------")
}






export { onHome };
