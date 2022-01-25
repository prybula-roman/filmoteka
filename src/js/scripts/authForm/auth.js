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

export default class Auth {
  constructor() {
    //--->

    this.fbase = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getDatabase(this.fbase);
    this.currentUser = JSON.parse(sessionStorage.getItem('logInUser'));

    //    console.log('this.currentUser');
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

        alert('User was registred');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
      });
  }

  readUser() {}

  singOutUser(auth) {
    signOut(auth)
      .then(() => {
        onHome();
        if (sessionStorage.getItem('logInUser')) {
          sessionStorage.removeItem('logInUser');
        }
        if (document.querySelector('.my-library-movies')) {
          document.querySelector('.my-library-movies').classList.toggle('my-library-movies');
        }
        config.btnLogIn.classList.toggle('visually-hidden');
        config.btnReg.classList.toggle('visually-hidden');
        config.btnLogOut.classList.toggle('visually-hidden');
        config.btnMyLabr.classList.toggle('visually-hidden');
      })
      .catch(error => {
        alert(`!!!!!!!!! ${error.messsage}`);
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
        if (btnAddFilm.textContent === 'DELETE WATCHED') {
          btnAddFilm.innerHTML = 'ADD TO WATCHED';
        } else {
          btnAddFilm.innerHTML = 'DELETE WATCHED';
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }
  //---------------------------------------------------------------------------
  addFilmToQueue(auth, fullName, email, password, database, jsonFilm) {
    update(ref(database, 'users/' + auth.currentUser.uid), {
      queueList: jsonFilm,
    })
      .then(resp => {
        const btnQueueFilm = document.querySelector('.currentLang-addQueue');
        if (btnQueueFilm.textContent === 'DELETE QUEUE') {
          btnQueueFilm.innerHTML = 'ADD TO QUEUE';
        } else {
          btnQueueFilm.innerHTML = 'DELETE QUEUE';
        }
      })
      .catch(error => {
        alert(error.message);
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
      .then(() => {
        const user = {
          name: fullName,
          email: email,
          password: password,
        };
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

        config.btnReg.classList.toggle('visually-hidden');
        config.btnLogOut.classList.toggle('visually-hidden');
        config.btnMyLabr.classList.toggle('visually-hidden');
      })
      .catch(e => {
        alert(e.message);
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
      alert('addToWatched(film)   Not User LogIn');
      return;
    }
    get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/filmList'))
      .then(snapshot => {
        let arrFilm = [];
        console.log('snapshot.val()=', snapshot.val());
        if (snapshot.exists()) {
          if (snapshot.val() === '[]') {
            arrFilm.push(film);
          } else {
            arrFilm = JSON.parse(snapshot.val());
            let filmInList = false;
            arrFilm.forEach(element => {
              if (element.id === film.id) {
                alert('Film in the list watched');
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
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  //---------------------------------------------------------------------------
  delFilmWatched(film) {
    console.log('delFilmWatched(film)');
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
            console.log(snapshot.val() === '[]');
          } else {
            arrFilm = JSON.parse(snapshot.val());
            arrFilm.forEach((item, index, arr) => {
              if (item.id === film.id) {
                arrFilm.splice(index, 1);
                //
                ///---------------
                console.log('refs.GLOBAL_IS_LIB=', refs.GLOBAL_IS_LIB);
                if (refs.GLOBAL_IS_LIB === true) {
                  // console.log('film.id=', film.id);
                  // document.getElementById(`${film.id}`).remove();
                  onCloseModal(); //закрыть модалку
                }
                console.log(
                  'document.getElementById(`${film.id}`)=',
                  document.getElementById(`${film.id}`),
                );
                document.getElementById(`${film.id}`).remove();
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
          console.log('Not data available');
        }
      })
      .catch(error => {
        alert(error.message);
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
      alert('addQueueWatched   Not User LogIn');
      return;
    }
    get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/queueList'))
      .then(snapshot => {
        let arrFilm = [];
        console.log('snapshot.val()=', snapshot.val());
        if (snapshot.exists()) {
          if (snapshot.val() === '[]') {
            arrFilm.push(film);
          } else {
            arrFilm = JSON.parse(snapshot.val());
            let filmInList = false;
            arrFilm.forEach(element => {
              if (element.id === film.id) {
                alert('Film is in the list queue');
                filmInList = true;
              }
            });
            if (filmInList === true) {
              return;
            } else {
              arrFilm.push(film);
            }
          }
          console.log(arrFilm);
          this.addFilmToQueue(
            this.auth,
            this.currentUser.name,
            this.currentUser.email,
            this.currentUser.password,
            this.db,
            JSON.stringify(arrFilm),
          );
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  //------------------------------------------------
  delQueueWatched(film) {
    console.log('delQueueWatched()');
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
            console.log(snapshot.val() === '[]');
          } else {
            arrFilm = JSON.parse(snapshot.val());
            arrFilm.forEach((item, index, arr) => {
              if (item.id === film.id) {
                arrFilm.splice(index, 1);
                // onCloseModal(); //закрыть модалку
                console.log('refs.GLOBAL_IS_QUE', refs.GLOBAL_IS_QUE);
                if (refs.GLOBAL_IS_QUE === true) {
                  onCloseModal(); //закрыть модалку
                }
                document.getElementById(`${film.id}`).remove();
                // refs.GLOBAL_IS_QUE = false;
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
          console.log('Not data available');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }

  findFilm(film, btn, dataTable) {
    if (sessionStorage.getItem('logInUser') != null) {
      console.log('dataTable=', dataTable);
      get(ref(this.db, 'users/' + this.auth.currentUser.uid + dataTable))
        .then(snapshot => {
          let arrFilm = [];
          // console.log('snapshot.val()=', snapshot.val());
          if (snapshot.exists()) {
            arrFilm = JSON.parse(snapshot.val());
            arrFilm.forEach(element => {
              if (element.id === film.id) {
                // alert('Film in the list watched');
                console.log('btn=', btn.textContent);
                if (btn.textContent === 'ADD TO QUEUE') {
                  btn.innerHTML = 'DELETE QUEUE';
                }
                if (btn.textContent === 'ADD TO WATCHED') {
                  btn.innerHTML = 'DELETE WATCHED';
                }
              }
            }); //foreach
          } else {
            alert('findFilm   Not User LogIn');
            return;
          }
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
}
//---------------------------------------------------------------------------
