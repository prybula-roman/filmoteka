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

export default class Auth {
  constructor(fullName, email, password) {
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
          filmList: [''],
        });
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
    console.log('auth=', auth);
    signOut(auth)
      .then(() => {
        onHome();
        alert('+++++ singOut +++++');
        return 1;
      })
      .catch(error => {
        alert(`!!!!!!!!! ${error.messsage}`);
      })
      .finally(() => {
        if (sessionStorage.getItem('logInUser')) {
          sessionStorage.removeItem('logInUser');
        }
      });
    return 0;
  }

  addFilmToUser(auth, fullName, email, password, database, jsonFilm) {
    // console.log('database=', database);
    // console.log('jsonFilm=', jsonFilm);
    // console.log('auth.currentUser.uid=', auth.currentUser.uid);
    update(ref(database, 'users/' + auth.currentUser.uid), {
      filmList: jsonFilm,
    })
      .then(resp => {})
      .catch(error => {
        alert(error.message);
      });
  }

  loginUser(auth, fullName, email, password) {
    if (this.currentUser) {
      console.log('loginUser()   this.currentUser=', this.currentUser);
      email = this.currentUser.email;
      password = this.currentUser.password;
      fullName = this.currentUser.name;
    }
    console.log('email=', email);
    console.log('password=', password);
    console.log('fullName=', fullName);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!localStorage.getItem('authorise')) {
          localStorage.setItem('authorise', JSON.stringify(this.currentUser));
        } else {
          localStorage.getItem('authorise').remove;
          localStorage.setItem('authorise', JSON.stringify(this.currentUser));
        }
        localStorage.setItem('authorise', JSON.stringify(this.currentUser));
        sessionStorage.setItem('logInUser', JSON.stringify(this.currentUser));

        config.btnLogIn.classList.toggle('visually-hidden');
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
}
