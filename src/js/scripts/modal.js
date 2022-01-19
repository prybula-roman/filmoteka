// import js
import { refs } from './refs';

// import templates
import movieCard from '../templates/modal.hbs';
import trailer from '../API/fetchTrailer';
import { currentTheme } from './toggle-theme';

//////////////////////roman/////////////
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

refs.openModalEl.addEventListener('click', onOpenModal);
refs.backdropEl.addEventListener('click', onBackdropClick);

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.bodyEl.classList.remove('show-modal');
  refs.closeModalEl.removeEventListener('click', onCloseModal);
  refs.modalEl.classList.add('js-backdrop');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onOpenModal(e) {
  e.preventDefault();

  if (currentTheme === 'dark-theme') {
    refs.modalWindowEl.classList.add('dark-theme');
  } else {
    refs.modalWindowEl.classList.remove('dark-theme');
  }
  window.addEventListener('keydown', onEscKeyPress);
  refs.closeModalEl.addEventListener('click', onCloseModal);

  if (e.target.classList.value === 'movies') {
    return;
  }

  const currentFilmId = Number(e.target.closest('li').id);

  return JSON.parse(localStorage.getItem('currentPage')).map(films => {
    films.forEach(film => {
      if (currentFilmId === film.id) {
        console.log('film=', film);

        const markupModal = movieCard(film);

        refs.modalmarkupEl.innerHTML = '';
        refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
        refs.bodyEl.classList.add('show-modal');

        /////////////////////roman////////////////////
        const btnAddFilm = document.querySelector('.add-to-watch');

        btnAddFilm.addEventListener('click', () => {
          const fullName = JSON.parse(localStorage.getItem('authorise')).name;
          const email = JSON.parse(localStorage.getItem('authorise')).email;
          const password = JSON.parse(localStorage.getItem('authorise')).password;

          const newAuth = new Auth(fullName, email, password);

          // console.log(localStorage.getItem('authorise'));

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
                      arrFilm.push(film);

                      console.log('arrFilm=', arrFilm);
                    } else {
                      console.log('====================================');
                      console.log('snapshot.val()=', snapshot.val());
                      arrFilm = JSON.parse(snapshot.val());
                      arrFilm.push(film);
                      console.log(arrFilm);
                    }

                    newAuth.addFilmToUser(
                      newAuth.auth,
                      fullName,
                      email,
                      password,
                      newAuth.db,
                      JSON.stringify(arrFilm),
                    );
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
        });
        /////////////////////////////////////////////////////////

        trailer.onPlayTrailer(document.querySelectorAll('.playTrailer'));
      }
    });
  });
}
