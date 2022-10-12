import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, child, update, get } from 'firebase/database';
import { setUserId } from 'firebase/analytics';
import { firebaseConfig } from './firebaseConfig';
import Form from './regForm';
import { onHome } from '../header';
import { config } from './configForm';
import { onCloseModal } from '../modal.js';
import { refs } from '../refs';
import { langs } from '../localization';
import Notiflix from 'notiflix';

//define class
export default class Auth {
  constructor() {
    //--->

    this.fbase = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getDatabase(this.fbase);
    this.currentUser = JSON.parse(sessionStorage.getItem('logInUser'));

    //    //console.log('this.currentUser');
  }
  get database() {
    return this.db;
  }
  get fb() {
    return this.fbase;
  }
  get authentic() {
    return this.auth;
  }
  
  createNewUser(auth, fullName, email, password, database) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        set(ref(database, 'users/' + auth.currentUser.uid), {
          id: auth.currentUser.uid,
          name: fullName,
          mail: email,
          filmList: '[]',
          queueList: '[]',
        });
        if (langs === 'ru') {
          Notiflix.Notify.success('Пользователь был зарегистрирован.');
          // alert('Пользователь был зарегистрирован.');
        }
        if (langs === 'uk') {
          Notiflix.Notify.success('Користувач був зареєстрований');
          //alert('Користувач був зареєстрований');
        }
        if (langs === 'en') {
          Notiflix.Notify.success('User was registred');
          //alert('User was registred');
        }

        // alert('User was registred');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          if (langs === 'ru') {
            Notiflix.Notify.failure('Пароль слишком слабый.');
            //alert('Пароль слишком слабый.');
          }
          if (langs === 'uk') {
            Notiflix.Notify.failure('Пароль занадто слабкий');
            //alert('Пароль занадто слабкий');
          }
          if (langs === 'en') {
            Notiflix.Notify.failure('The password is too weak.');
            //alert('The password is too weak.');
          }
          // alert('The password is too weak.');
        } else {
          Notiflix.Notify.failure(errorMessage);
         // alert(errorMessage);
        }
      });
  }

  singOutUser(auth) {
    signOut(auth)
      .then(() => {
        // console.log("adsfj")
        onHome();
        if (sessionStorage.getItem('logInUser')) {
          sessionStorage.removeItem('logInUser');
        }
        if (localStorage.getItem('authorise')) {
          localStorage.removeItem('authorise');
        }
        if (document.querySelector('.my-library-movies')) {
          document.querySelector('.my-library-movies').classList.toggle('my-library-movies');
        }
        if (!config.userNameLabel.classList.contains('visually-hidden')) {
          config.userNameLabel.textContent = '';
          config.userNameLabel.classList.add('visually-hidden');
        }
        config.btnLogIn.classList.toggle('visually-hidden');
        config.btnReg.classList.toggle('visually-hidden');
        config.btnLogOut.classList.toggle('visually-hidden');
        config.btnMyLabr.classList.toggle('visually-hidden');
      })
      .catch(error => {
        Notiflix.Notify.failure(errorMessage);
       // alert(`!!!!!!!!! ${error.messsage}`);
      })
      .finally(() => {});
  }
  //--------------------------------------------------------------------------
  addFilmToUser(auth, fullName, email, password, database, jsonFilm) {
    update(ref(database, 'users/' + auth.currentUser.uid), {
      filmList: jsonFilm,
    })
      .then(resp => {
        //------------------------------------------------
        const btnAddFilm = document.querySelector('.currentLang-addWatched');
        // if (btnAddFilm.textContent === refs.nameBtnDelWatch) {
        //   btnAddFilm.innerHTML = refs.nameBtnAddWatch;
        // } else {
        //   btnAddFilm.innerHTML = refs.nameBtnDelWatch;

        if (
          btnAddFilm.textContent === refs.nameBtnDelWatch ||
          btnAddFilm.textContent === refs.nameBtnDelWatchUa ||
          btnAddFilm.textContent === refs.nameBtnDelWatchRu
        ) {
          //  btnAddFilm.innerHTML = refs.nameBtnAddWatch;
          if (langs === 'ru') {
            btnAddFilm.textContent = refs.nameBtnAddWatchRu;
          }
          if (langs === 'uk') {
            btnAddFilm.textContent = refs.nameBtnAddWatchUa;
          }
          if (langs === 'en') {
            btnAddFilm.textContent = refs.nameBtnAddWatch;
          }
        } else {
          //  btnAddFilm.innerHTML = refs.nameBtnDelWatch;
          if (langs === 'ru') {
            btnAddFilm.textContent = refs.nameBtnDelWatchRu;
          }
          if (langs === 'uk') {
            btnAddFilm.textContent = refs.nameBtnDelWatchUa;
          }
          if (langs === 'en') {
            btnAddFilm.textContent = refs.nameBtnDelWatch;
          }
        }
        //  }
      })
      .catch(error => {
        Notiflix.Notify.failure(error.message);
        // alert(error.message);
      });
  }
  //---------------------------------------------------------------------------
  addFilmToQueue(auth, fullName, email, password, database, jsonFilm) {
    update(ref(database, 'users/' + auth.currentUser.uid), {
      queueList: jsonFilm,
    })
      .then(resp => {
        const btnQueueFilm = document.querySelector('.currentLang-addQueue');

        // btnQueueFilm.innerHTML = refs.nameBtnDelQueue;
        //console.log('btnQueueFilm=', btnQueueFilm);
        if (
          btnQueueFilm.textContent === refs.nameBtnDelQueue ||
          btnQueueFilm.textContent === refs.nameBtnDelQueueUa ||
          btnQueueFilm.textContent === refs.nameBtnDelQueueRu
        ) {
          // btnQueueFilm.innerHTML = refs.nameBtnAddQueue;
          if (langs === 'ru') {
            btnQueueFilm.textContent = refs.nameBtnAddQueueRu;
          }
          if (langs === 'uk') {
            btnQueueFilm.textContent = refs.nameBtnAddQueueUa;
          }
          if (langs === 'en') {
            btnQueueFilm.textContent = refs.nameBtnAddQueue;
          }
        } else {
          //  btnQueueFilm.innerHTML = refs.nameBtnDelQueue;
          if (langs === 'ru') {
            btnQueueFilm.textContent = refs.nameBtnDelQueueRu;
          }
          if (langs === 'uk') {
            btnQueueFilm.textContent = refs.nameBtnDelQueueUa;
          }
          if (langs === 'en') {
            btnQueueFilm.textContent = refs.nameBtnDelQueue;
          }
        }
      })
      .catch(error => {
        Notiflix.Notify.failure(error.message);
      });
  }
  //---------------------------------------------------------------------------
  loginUser(auth, fullName, email, password) {
    if (this.currentUser) {
      if (this.currentUser != null) {
        this.currentUser.email = email;
        this.currentUser.password = password;
        this.currentUser.name = fullName;
      }
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(resp => {
        //console.log('resp=', resp);
        //----------------------------------------------
        get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/name')).then(snapshot => {
          let arrFilm = [];
          if (snapshot.exists()) {
            //console.log('snapshot.val()=', snapshot.val());
            const user = {
              name: fullName,
              email: email,
              password: password,
            };
            user.name = snapshot.val();
            if (!localStorage.getItem('authorise')) {
              localStorage.setItem('authorise', JSON.stringify(user));
            } else {
              localStorage.removeItem('authorise');
              localStorage.setItem('authorise', JSON.stringify(user));
            }
            sessionStorage.setItem('logInUser', JSON.stringify(user));
            if (!config.btnLogIn.classList.contains('visually-hidden')) {
              config.btnLogIn.classList.add('visually-hidden');
            }
            if (config.userNameLabel.classList.contains('visually-hidden')) {
              config.userNameLabel.classList.remove('visually-hidden');
              config.userNameLabel.textContent = `${snapshot.val()}`;
            }
            config.btnReg.classList.toggle('visually-hidden');
            config.btnLogOut.classList.toggle('visually-hidden');
            config.btnMyLabr.classList.toggle('visually-hidden');
          }
        });
        //-----------------------------------------------
      })
      .catch(error => {
        Notiflix.Notify.failure(error.message);
        return 0;
      });
    return 1;
  }
  //---------------------------------------------------------------------------
  addToWatched(film) {
    if (sessionStorage.getItem('logInUser') != null) {
      if (this.currentUser) {
        if (this.currentUser != null) {
          this.currentUser.email = JSON.parse(sessionStorage.getItem('logInUser')).email;
          this.currentUser.password = JSON.parse(sessionStorage.getItem('logInUser')).password;
          this.currentUser.name = JSON.parse(sessionStorage.getItem('logInUser')).name;
        }
      }
    } else {
      if (langs === 'ru') {
        Notiflix.Notify.failure('Додати фiльм до перегллянутих Немає входу користувача');
        //  alert('Додати фiльм до перегллянутих Немає входу користувача');
      }
      if (langs === 'uk') {
        Notiflix.Notify.failure('Добавить фильм в просмотренные Нет входа пользователя');
        //alert('Добавить фильм в просмотренные Нет входа пользователя');
      }
      if (langs === 'en') {
        Notiflix.Notify.failure('addToWatched(film)   Not User LogIn');
        // alert('addToWatched(film)   Not User LogIn');
      }
      // alert('addToWatched(film)   Not User LogIn');
      return;
    }
    get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/filmList'))
      .then(snapshot => {
        let arrFilm = [];
        //   //console.log('snapshot.val()=', snapshot.val());
        if (snapshot.exists()) {
          if (snapshot.val() === '[]') {
            arrFilm.push(film);
          } else {
            arrFilm = JSON.parse(snapshot.val());
            let filmInList = false;
            arrFilm.forEach(element => {
              if (element.id === film.id) {
                if (langs === 'ru') {
                  Notiflix.Notify.info('Фильм находится в списке просмотренных')
                 // alert('Фильм находится в списке просмотренных');
                }
                if (langs === 'uk') {
                  Notiflix.Notify.info('Фiльм знаходиться у списку переглянутих')
                  //alert('Фiльм знаходиться у списку переглянутих');
                }
                if (langs === 'en') {
                  Notiflix.Notify.info('Film in the list watched')
                  //alert('Film in the list watched');
                }
                // alert('Film in the list watched');
                filmInList = true;
              }
            });
            if (filmInList === true) {
              return;
            } else {
              arrFilm.push(film);
            }
          }
          this.addFilmToUser(
            this.auth,
            this.currentUser.name,
            this.currentUser.email,
            this.currentUser.password,
            this.db,
            JSON.stringify(arrFilm),
          );
        } else {
          Notiflix.Notify.info('No data available');
          ////console.log('No data available');
        }
      })
      .catch(error => {
        Notiflix.Notify.error(error.message);
        //console.error(error.message);
      });
  }
  //---------------------------------------------------------------------------
  delFilmWatched(film) {
    //console.log('delFilmWatched(film)');
    if (sessionStorage.getItem('logInUser') != null) {
      if (this.currentUser) {
        if (this.currentUser != null) {
          this.currentUser.email = JSON.parse(sessionStorage.getItem('logInUser')).email;
          this.currentUser.password = JSON.parse(sessionStorage.getItem('logInUser')).password;
          this.currentUser.name = JSON.parse(sessionStorage.getItem('logInUser')).name;
        }
      }
    } else {
      return;
    }
    get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/filmList'))
      .then(snapshot => {
        let arrFilm = [];
        if (snapshot.exists()) {
          if (snapshot.val() === '[]') {
            //console.log(snapshot.val() === '[]');
          } else {
            arrFilm = JSON.parse(snapshot.val());

            arrFilm.forEach((item, index, arr) => {
              if (item.id === film.id) {
                arrFilm.splice(index, 1);

                if (arrFilm.length === 0) {
                  const noMovie = refs.noMoviesEl;
                  if (noMovie.classList.contains('visually-hidden')) {
                    noMovie.classList.remove('visually-hidden');
                  }
                }
                //
                ///---------------
                // //console.log('refs.GLOBAL_IS_LIB=', refs.GLOBAL_IS_LIB);
                if (refs.GLOBAL_IS_LIB === true) {
                  // //console.log('film.id=', film.id);
                  // document.getElementById(`${film.id}`).remove();
                  onCloseModal(); //закрыть модалку
                  document.getElementById(`${film.id}`).remove();
                }
                //document.getElementById(`${film.id}`).remove();
                //refs.GLOBAL_IS_LIB = false;
              }
            });
          }
          this.addFilmToUser(
            this.auth,
            this.currentUser.name,
            this.currentUser.email,
            this.currentUser.password,
            this.db,
            JSON.stringify(arrFilm),
          );
        } else {
          //console.log('Not data available');
        }
      })
      .catch(error => {
        Notiflix.Notify.failure(error.message);
        //alert(error.message);
      });
  }
  //-------------------------------------------------------------
  addQueueWatched(film) {
    if (sessionStorage.getItem('logInUser') != null) {
      if (this.currentUser) {
        if (this.currentUser != null) {
          this.currentUser.email = JSON.parse(sessionStorage.getItem('logInUser')).email;
          this.currentUser.password = JSON.parse(sessionStorage.getItem('logInUser')).password;
          this.currentUser.name = JSON.parse(sessionStorage.getItem('logInUser')).name;
        }
      }
    } else {
      if (langs === 'ru') {
        Notiflix.Notify.warning('Добавить в очередь просмотренных Нет входа пользователя');
       // alert('Добавить в очередь просмотренных Нет входа пользователя');
      }
      if (langs === 'uk') {
        Notiflix.Notify.warning('Додати до черги переглянутих Нема входу користувача');
       // alert('Додати до черги переглянутих Нема входу користувача');
      }
      if (langs === 'en') {
        Notiflix.Notify.warning('addQueueWatched   Not User LogIn');
        //alert('addQueueWatched   Not User LogIn');
      }
      // alert('addQueueWatched   Not User LogIn');
      return;
    }
    get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/queueList'))
      .then(snapshot => {
        let arrFilm = [];
        //console.log('snapshot.val()=', snapshot.val());
        if (snapshot.exists()) {
          if (snapshot.val() === '[]') {
            arrFilm.push(film);
          } else {
            arrFilm = JSON.parse(snapshot.val());
            let filmInList = false;
            arrFilm.forEach(element => {
              if (element.id === film.id) {
                if (langs === 'ru') {
                  Notiflix.Notify.warning('Фильм находится в списке просмотренных');
                 // alert('Фильм находится в списке просмотренных');
                }
                if (langs === 'uk') {
                  Notiflix.Notify.warning('Фiльм знаходиться у списку переглянутих');
                 // alert('Фiльм знаходиться у списку переглянутих');
                }
                if (langs === 'en') {
                  Notiflix.Notify.warning('Film in the list watched');
                  //alert('Film in the list watched');
                }
                // alert('Film is in the list queue');
                filmInList = true;
              }
            });
            if (filmInList === true) {
              return;
            } else {
              arrFilm.push(film);
            }
          }
          //console.log('arrFilm=', arrFilm);
          this.addFilmToQueue(
            this.auth,
            this.currentUser.name,
            this.currentUser.email,
            this.currentUser.password,
            this.db,
            JSON.stringify(arrFilm),
          );
        } else {
          //console.log('No data available');
        }
      })
      .catch(error => {
        Notiflix.Notify.failure(error.message);
       // console.error(error.message);
      });
  }
  //------------------------------------------------
  delQueueWatched(film) {
    //console.log('delQueueWatched()');
    if (sessionStorage.getItem('logInUser') != null) {
      if (this.currentUser) {
        if (this.currentUser != null) {
          this.currentUser.email = JSON.parse(sessionStorage.getItem('logInUser')).email;
          this.currentUser.password = JSON.parse(sessionStorage.getItem('logInUser')).password;
          this.currentUser.name = JSON.parse(sessionStorage.getItem('logInUser')).name;
        }
      }
    } else {
      return;
    }
     get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/queueList'))
      .then(snapshot => {
        let arrFilm = [];
        if (snapshot.exists()) {
          if (snapshot.val() === '[]') {
            //console.log(snapshot.val() === '[]');
          } else {
            arrFilm = JSON.parse(snapshot.val());
            arrFilm.forEach((item, index, arr) => {
              if (item.id === film.id) {
                arrFilm.splice(index, 1);
                if (arrFilm.length === 0) {
                  const noMovie = refs.noMoviesEl;
                  if (noMovie.classList.contains('visually-hidden')) {
                    noMovie.classList.remove('visually-hidden');
                  }
                }
                // onCloseModal(); //закрыть модалку
                //console.log('refs.GLOBAL_IS_QUE', refs.GLOBAL_IS_QUE);
                if (refs.GLOBAL_IS_QUE === true) {
                  onCloseModal(); //закрыть модалку
                  document.getElementById(`${film.id}`).remove();
                }
              }
            });
          }
          this.addFilmToQueue(
            this.auth,
            // fullName,
            this.currentUser.name,
            this.currentUser.email,
            this.currentUser.password,
            this.db,
            JSON.stringify(arrFilm),
          );
        } else {
          //console.log('Not data available');
        }
      })
      .catch(error => {
        Notiflix.Notify.failure(error.message);
       // console.error(error.message);
      });
    } 
  
//------------------------------------------------------------------------
  findFilm(film, btn, dataTable) {
    if (sessionStorage.getItem('logInUser') != null) {
      //console.log('dataTable=', dataTable);
      get(ref(this.db, 'users/' + this.auth.currentUser.uid + dataTable))
        .then(snapshot => {
          let arrFilm = [];
          
          if (snapshot.exists()) {
            arrFilm = JSON.parse(snapshot.val());
            arrFilm.forEach(element => {
              if (element.id === film.id) {
                
                if (
                  btn.textContent === refs.nameBtnAddQueue ||
                  btn.textContent === refs.nameBtnAddQueueUa ||
                  btn.textContent === refs.nameBtnAddQueueRu
                ) {
                  // btn.innerHTML = 'DELETE QUEUE';
                  if (langs === 'ru') {
                    btn.innerHTML = refs.nameBtnDelQueueRu;
                  }
                  if (langs === 'uk') {
                    btn.innerHTML = refs.nameBtnDelQueueUa;
                  }
                  if (langs === 'en') {
                    btn.innerHTML = refs.nameBtnDelQueue;
                  }
                }
                if (
                  btn.textContent === refs.nameBtnAddWatch ||
                  btn.textContent === refs.nameBtnAddWatchRu ||
                  btn.textContent === refs.nameBtnAddWatchUa
                ) {
                  // btn.innerHTML = 'DELETE WATCHED';
                  if (langs === 'ru') {
                    btn.innerHTML = refs.nameBtnDelWatchRu;
                  }
                  if (langs === 'uk') {
                    btn.innerHTML = refs.nameBtnDelWatchUa;
                  }
                  if (langs === 'en') {
                    btn.innerHTML = refs.nameBtnDelWatch;
                  }
                }
                // }
              }
            }); //foreach
          } else {
            // alert('findFilm   Not User LogIn');
            if (langs === 'ru') {
              Notiflix.Notify.warning('Найти фильм Нет входа пользователя');
             // alert('Найти фильм Нет входа пользователя');
            }
            if (langs === 'uk') {
              Notiflix.Notify.warning('Зайти фiльм Немa входу користувача');
              //alert('Зайти фiльм Немa входу користувача');
            }
            if (langs === 'en') {
              Notiflix.Notify.warning('findFilm   Not User LogIn');
              //alert('findFilm   Not User LogIn');
            }
            return;
          }
        })
        .catch(error => {
          Notiflix.Notify.warning(error.message);
         // alert(error.message);
        });
    }
  }
}
//---------------------------------------------------------------------------
