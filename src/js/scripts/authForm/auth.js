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
    console.log("singOutUser()----->>>>")
    console.log('auth=', auth);
    signOut(auth)
      .then(() => {
        onHome();
        if (sessionStorage.getItem('logInUser')) {
          console.log(sessionStorage.getItem('logInUser'));
          sessionStorage.removeItem('logInUser');
          console.log(sessionStorage.getItem('logInUser'));
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
      .finally(() => {
        console.log("singOutUser()   finally")
      });
  }

  addFilmToUser(auth, fullName, email, password, database, jsonFilm) {
    update(ref(database, 'users/' + auth.currentUser.uid), {
      filmList: jsonFilm,
    })
      .then(resp => {
        const btnAddFilm = document.querySelector('.add-to-watch');
        btnAddFilm.innerHTML="Delete"  

      })
      .catch(error => {
        alert(error.message);
      });
  }

  loginUser(auth, fullName, email, password) {
console.log("loginUser----->>>>>")
   if(this.currentUser) {
      if(this.currentUser!=null){
        this.currentUser.email= email  ;
        this.currentUser.password= password ;
        this.currentUser.name=fullName ;
      }

    }
    console.log('loginUser() email=', email);
    console.log('loginUser()   password=', password);
    console.log('loginUser()  fullName=', fullName);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {

        const user={
          name:fullName,
          email:email,
          password:password
      }
        if (!localStorage.getItem('authorise')) {
          localStorage.setItem('authorise', JSON.stringify(user));
        } else {
           localStorage.removeItem('authorise');
           localStorage.setItem('authorise', JSON.stringify(user));
        }
         sessionStorage.setItem('logInUser',JSON.stringify(user))
        config.btnLogIn.classList.toggle('visually-hidden');
        config.btnReg.classList.toggle('visually-hidden');
        config.btnLogOut.classList.toggle('visually-hidden');
        config.btnMyLabr.classList.toggle('visually-hidden');
      })
      .catch(e => {
        alert(e.message);
        return 0;
      });
      console.log("<<<<<-------loginUser()")
    return 1;

  }

   addToWatched(film){
    get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/filmList'))
      .then(snapshot => {
        console.log('snapshot=', snapshot);
        console.log('snapshot.val()=', snapshot.val());
        let arrFilm = [];
        if (snapshot.exists()) {
          if (snapshot.val()[0] === '') {
            arrFilm.push(film);
          } else {
            arrFilm = JSON.parse(snapshot.val());
            arrFilm.push(film);
          }
          this.addFilmToUser(
            this.auth,
            fullName,
            email,
            password,
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


 delFilmWatched(film) {
    console.log('btnDel.addEventListener');
    
    get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/filmList'))
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
          this.addFilmToUser(
            this.auth,
            fullName,
            email,
            password,
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

}
