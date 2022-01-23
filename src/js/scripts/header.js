import { refs } from './refs';
import onRenderPopularMoviesMarkup from './search';

//////////////////////roman/////////////
import filmCard from '../templates/preview_card.hbs';
//import filmCard from '../templates/modal_lybr.hbs';

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
  refs.wrapperSwiperEl.classList.add("is-hidden")
  refs.filterEl.style.display = 'none';

  refs.formEl.classList.add('is-hidden');
    refs.libraryListEl.classList.remove('is-hidden');
    refs.homeEl.classList.remove('nav-list__link--current');
    refs.myLibEl.classList.add('nav-list__link--current');
    refs.headerEl.classList.remove('header__container');
    refs.headerEl.classList.add('library-bgi');
    refs.galleryEl.innerHTML = '';
    // refs.mainEl.style.minHeight = 'calc(100vh - 80px)';
    refs.paginationEl.classList.add('pagination__off');
    
    refs.errorEl.classList.add("visually-hidden");
  

    // if(refs.galleryEl.innerHTML === ''){
    //   refs.noMoviesEl.classList.remove("visually-hidden");
    // }else{
    //   refs.noMoviesEl.classList.add("visually-hidden");
    // }
     /////////////////////////////////////////////////////
  const listCards = document.querySelector('.movies');
  listCards.classList.toggle('my-library-movies');
  console.log("listCards=",listCards);
if(document.querySelector(".my-library-movies")){
  renderLibrary();
}
  
  /////////////////////////////////////////////////////
}

refs.homeEl.addEventListener('click', onHome);
onRenderPopularMoviesMarkup();
function onHome() {
    refs.filterEl.style.display = 'block';
    refs.formEl.classList.remove('is-hidden');
    refs.libraryListEl.classList.add('is-hidden');
    refs.homeEl.classList.add('nav-list__link--current');
    refs.myLibEl.classList.remove('nav-list__link--current');
    refs.headerEl.classList.remove('library-bgi');
    refs.headerEl.classList.add('library');
    refs.galleryEl.innerHTML = '';
    refs.noMoviesEl.classList.add("visually-hidden");
    onRenderPopularMoviesMarkup();
    refs.formEl.reset()
    console.log(document.querySelector('.movies'))
    document.querySelector('.movies').classList.toggle('my-library-movies');
  console.log('<<<<--------onHome()');

  refs.wrapperSwiperEl.classList.remove("is-hidden")

}

function renderLibrary() {
  console.log('renderLibrary()----->>>>');
  const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
  const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
  const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
  const newAuth = new Auth(fullName, email, password);
    get(ref(newAuth.db, 'users/' + newAuth.auth.currentUser.uid + '/filmList'))
      .then(snapshot => {
        console.log('renderLibrary()  snapshot=', snapshot);
        let arrFilm = [];
        if (snapshot.exists()) {
          if (JSON.parse( snapshot.val()).length === 0) {
            refs.noMoviesEl.classList.remove('visually-hidden');
            console.log("Nothig do");
          } else {
            refs.noMoviesEl.classList.add('visually-hidden');
            arrFilm = JSON.parse(snapshot.val());
            const listCards = document.querySelector('.movies');
            listCards.insertAdjacentHTML('beforeend', filmCard(arrFilm));
          //  const btnDel = document.querySelector('.add-to-watch');
          //  console.log("btnDel=",btnDel)
            //btnDel.classList().toggle(".del-to-watch");
         //   btnDel.innerHTML="Delete"

          }
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.log(error.message);
      });

  console.log('<<<<<-----renderLibrary()');
}

export { onHome };

