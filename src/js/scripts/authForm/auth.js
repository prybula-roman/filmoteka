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

export default class Auth {
  // методы класса
  constructor(fullName, email, password) {
    //--->
    this.fbase = initializeApp(firebaseConfig); //хранится общая конфигурация и используется аутентификация для всех служб Firebase
    //создание экземпляра auth
    this.auth = getAuth();
    console.log('auth:', this.auth);
    //получаем ссылку на БД
    this.db = getDatabase(this.fbase);

    console.log('db=', this.db);
    //================================

    //this.createUserEmailAndPassword(fullName,email,password,auth);
  }
  get database() {
    return this.db;
  }
  ///////////////////////////////////////
  get fb() {
    return this.fbase;
  }
  get authentic() {
    return this.auth;
  }
  ///////////////////////////////////////////////////

  //////////////////////////////////////////////////
  createNewUser(auth, fullName, email, password, database) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        //создаем профиль в БД
        set(ref(database, 'users/' + auth.currentUser.uid), {
          id: auth.currentUser.uid,
          name: fullName,
          mail: email,
          filmList: [''],
        });

        //this.createUserDB(fullName,email,auth);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
  /////////////////////////////////////////////////////////////
  readUser() {}

  /////////////////////////////////////////////////////////////
  singOutUser() {
    signOut(this.auth);

    alert('singOut');
  }
  //////////////////////////////////////////////////////////////
  addFilmToUser(auth, fullName, email, password, database, jsonFilm) {
  //  console.log('database=', database);
  //  console.log('jsonFilm=', jsonFilm);
  //  console.log('auth.currentUser.uid=', auth.currentUser.uid);
    update(ref(database, 'users/' + auth.currentUser.uid), {
      filmList: jsonFilm,
    })
      .then(resp => {
        alert('update data succefully');
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////

  loginUser(auth, fullName, email, password, database) {
    console.log('loginUser');

if(sessionStorage.getItem("logInUser")){
if(JSON.parse(sessionStorage)!=null){


  }else{

    email=JSON.parse(sessionStorage)
  }

}


    const promise = signInWithEmailAndPassword(auth, email, password);
    promise.catch(e => {
      alert(e.message);
    });
    alert('loginUser()  SingIn');
    return promise;
  }
}
