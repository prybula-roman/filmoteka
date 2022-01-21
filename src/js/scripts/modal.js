import { refs } from './refs';
import movieCard from '../templates/modal.hbs';
import movieCardLyb from '../templates/modal_lybr.hbs';
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
refs.openSwiperModalEl.addEventListener('click', onOpenModal);

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

// function onOpenModal(e) {
//   e.preventDefault();

//   if (currentTheme === 'dark-theme') {
//     refs.modalWindowEl.classList.add('dark-theme');
//   } else {
//     refs.modalWindowEl.classList.remove('dark-theme');
//   }
//   window.addEventListener('keydown', onEscKeyPress);
//   refs.closeModalEl.addEventListener('click', onCloseModal);

//           if (e.target.classList.value === 'movies') {
//             return;
//           }
//         const currentFilmId = Number(e.target.closest('li').id);
//          if (e.target.classList.value === 'movies__poster') {
//           return JSON.parse(localStorage.getItem('currentPage')).map(films => {
//             films.forEach(film => {
//              if (currentFilmId === film.id) {
//              let markupModal = null;

//               if (document.querySelector('.my-library-movies')) {
//              markupModal = movieCardLyb(film);
//              } else {
//                markupModal = movieCard(film);
//                }
//               refs.modalmarkupEl.innerHTML = '';
//               refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
//               refs.bodyEl.classList.add('show-modal');
//               if(document.querySelector('.my-library-movies')){
//               const btnDel = document.querySelector('.del-to-queue');
//               btnDel.addEventListener('click', () => {
//                console.log('btnDel.addEventListener');
//                const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
//                const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
//                const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
//                const newAuth = new Auth(fullName, email, password);
//                 get(ref(newAuth.db, 'users/' + newAuth.auth.currentUser.uid + '/filmList'))
//                   .then(snapshot => {
//                     let arrFilm = [];
//                     if (snapshot.exists()) {
//                       if (snapshot.val()[0] === '') {
//                       } else {
//                         arrFilm = JSON.parse(snapshot.val());
//                         arrFilm.forEach((item, index, arr) => {
//                           if (item.id === film.id) {

//                             arrFilm.splice(index, 1);
//                             onCloseModal(); //закрыть модалку
//                             document.getElementById(`${film.id}`).remove();
//                           }
//                         });
//                       }
//                       newAuth.addFilmToUser(
//                         newAuth.auth,
//                         fullName,
//                         email,
//                         password,
//                         newAuth.db,
//                         JSON.stringify(arrFilm),
//                       );
//                     } else {
//                       console.log('Not data available');
//                     }
//                   })
//                   .catch(error => {
//                     alert(error.message);
//                   });
//           });
//         }

//         /////////////////////////////////////////////////////////
//         if (document.querySelector('.add-to-watch')) {
//           if(!sessionStorage.getItem('logInUser')){
//             document.querySelector('.add-to-watch').classList.toggle('visually-hidden');
//           }
//           const btnAddFilm = document.querySelector('.add-to-watch');
//           btnAddFilm.addEventListener('click', () => {
//             const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
//             const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
//             const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
//             const newAuth = new Auth(fullName, email, password);
//               ///////читаем список фильмов в массив///////////////////////
//              /// console.log('newAuth.currentUser.uid=', newAuth.auth.currentUser.uid);
//               get(ref(newAuth.db, 'users/' + newAuth.auth.currentUser.uid + '/filmList'))
//                 .then(snapshot => {
//                   console.log('snapshot=', snapshot);
//                   console.log('snapshot.val()=', snapshot.val());
//                   let arrFilm = [];
//                   if (snapshot.exists()) {
//                     if (snapshot.val()[0] === '') {
//                       console.log('-----------------------------------');
//                       arrFilm.push(film);
//                       console.log('arrFilm=', arrFilm);
//                     } else {
//                       console.log('====================================');
//                       console.log('snapshot.val()=', snapshot.val());
//                       arrFilm = JSON.parse(snapshot.val());
//                       arrFilm.push(film);
//                       console.log(arrFilm);
//                     }

//                     newAuth.addFilmToUser(
//                       newAuth.auth,
//                       fullName,
//                       email,
//                       password,
//                       newAuth.db,
//                       JSON.stringify(arrFilm),
//                     );
//                   } else {
//                     console.log('No data available');
//                   }
//                 })
//                 .catch(error => {
//                   console.error(error.message);
//                 });

//               /////////////////////////////////////////////////////////////////
//           });
//                   //         if (e.target.classList.value === 'movies__poster') {
//                   //           return JSON.parse(localStorage.getItem("currentPage")).map(films => {
//                   //             films.forEach(film => {
//                   //           if (currentFilmId === film.id) {
//                   //             const markupModal = movieCard(film);
//                   //             refs.modalmarkupEl.innerHTML = '';
//                   //             refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
//                   //             refs.bodyEl.classList.add('show-modal');
//                   //        }
//                   //      }
//                   //     )
//                   //   })
//                   // }
//          }
//          }

//   else if (e.target.classList.value === 'swiper__poster') {
//     return JSON.parse(localStorage.getItem("currentSwiperPage")).map(films => {
//       films.results.forEach(film => {

//         if (currentFilmId === film.id) {
//           const markupSwiperModal = movieCard(film);
//           refs.modalmarkupEl.innerHTML = '';
//           refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupSwiperModal);
//           refs.bodyEl.classList.add('show-modal');
//           trailer.onPlayTrailer(document.querySelectorAll('.playTrailer'));
//         }
//       })
//     })
//   }
// }

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
        let markupModal = null;

        if (document.querySelector('.my-library-movies')) {
          markupModal = movieCardLyb(film);
        } else {
          markupModal = movieCard(film);
        }

        refs.modalmarkupEl.innerHTML = '';
        refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
        refs.bodyEl.classList.add('show-modal');

        if (document.querySelector('.my-library-movies')) {
          const btnDel = document.querySelector('.del-to-queue');
          btnDel.addEventListener('click', () => {
            console.log('btnDel.addEventListener');
            const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
            const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
            const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
            const newAuth = new Auth(fullName, email, password);
            //    if(  newAuth.loginUser(newAuth.auth, fullName, email, password))
            //     {
            get(ref(newAuth.db, 'users/' + newAuth.auth.currentUser.uid + '/filmList'))
              .then(snapshot => {
                let arrFilm = [];
                if (snapshot.exists()) {
                  if (snapshot.val()[0] === '') {
                  } else {
                    arrFilm = JSON.parse(snapshot.val());
                    arrFilm.forEach((item, index, arr) => {
                      if (item.id === film.id) {
                        arrFilm.splice(index, 1);
                        onCloseModal(); //закрыть модалку
                        document.getElementById(`${film.id}`).remove();
                      }
                    });
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
                  console.log('Not data available');
                }
              })
              .catch(error => {
                alert(error.message);
              });
            //       }
          });
        }

        /////////////////////////////////////////////////////////
        if (document.querySelector('.add-to-watch')) {
          if (!sessionStorage.getItem('logInUser')) {
            document.querySelector('.add-to-watch').classList.toggle('visually-hidden');
          }
          const btnAddFilm = document.querySelector('.add-to-watch');
          btnAddFilm.addEventListener('click', () => {
            const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
            const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
            const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
            const newAuth = new Auth(fullName, email, password);
            //  if (newAuth.loginUser(newAuth.auth, fullName, email, password, newAuth.db)) {
            ///////читаем список фильмов в массив///////////////////////
            console.log('newAuth.currentUser.uid=', newAuth.auth.currentUser.uid);
            get(ref(newAuth.db, 'users/' + newAuth.auth.currentUser.uid + '/filmList'))
              .then(snapshot => {
                console.log('snapshot=', snapshot);
                console.log('snapshot.val()=', snapshot.val());
                let arrFilm = [];
                if (snapshot.exists()) {
                  if (snapshot.val()[0] === '') {
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
            //   }
          });

          trailer.onPlayTrailer(document.querySelectorAll('.playTrailer'));
        }
      }
    });
  });
}
export { onOpenModal };
