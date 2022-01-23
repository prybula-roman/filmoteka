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
import {onCloseModal} from "../modal.js"

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
      .finally(() => {
       
      });
  }

  addFilmToUser(auth, fullName, email, password, database, jsonFilm) {
  update(ref(database, 'users/' + auth.currentUser.uid), {
      filmList: jsonFilm,
    })
      .then(resp => { 
        const btnAddFilm = document.querySelector('.currentLang-addWatched');
        console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
        console.log("btnAddFilm.textContent",btnAddFilm.textContent)
        if(btnAddFilm.textContent==='DELETE WATCHED'){
          console.log("btnAddFilm.textContent=DELETE WATCHED")
          btnAddFilm.innerHTML="ADD TO WATCHED"
       //   btnAddFilm.classList.remove("movies-btn__button--current")
        }
        else{
          console.log("btnAddFilm.textContent=ADD TO WATCHED")
          btnAddFilm.innerHTML="DELETE WATCHED"
         // btnAddFilm.classList.add("movies-btn__button--current")

        }    
      })
      .catch(error => {
        alert(error.message);
      });
  }


loginUser(auth, fullName, email, password) {
   if(this.currentUser) {
      if(this.currentUser!=null){
        this.currentUser.email= email  ;
        this.currentUser.password= password ;
        this.currentUser.name=fullName ;
      }
    }
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
    return 1;
  }

   addToWatched(film){
     if (sessionStorage.getItem('logInUser')!=null){
      if(this.currentUser) {
        if(this.currentUser!=null){
          this.currentUser.email= JSON.parse(sessionStorage.getItem('logInUser')).email;
          this.currentUser.password= JSON.parse(sessionStorage.getItem('logInUser')).password;
          this.currentUser.name=JSON.parse(sessionStorage.getItem('logInUser')).name;;
        }
      }
    }else{
      console.log("$$$$$$$$$$$$$$$$$$")
      return;
    }   
    get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/filmList'))
      .then(snapshot => {
        let arrFilm = [];
        console.log("snapshot.val()=",snapshot.val())
        if (snapshot.exists()){
          if ( snapshot.val() === "[]") {
            console.log("************")
            arrFilm.push(film);
          } else { 
            console.log("==================")
            arrFilm =JSON.parse(snapshot.val());
            arrFilm.push(film);
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


 delFilmWatched(film) {
//console.log("delFilmWatched(film)")
    if (sessionStorage.getItem('logInUser')!=null){
      if(this.currentUser) {
        if(this.currentUser!=null){
          this.currentUser.email= JSON.parse(sessionStorage.getItem('logInUser')).email;
          this.currentUser.password= JSON.parse(sessionStorage.getItem('logInUser')).password;
          this.currentUser.name=JSON.parse(sessionStorage.getItem('logInUser')).name;;
        }
      }
    }else{
      return;
    }
    get(ref(this.db, 'users/' + this.auth.currentUser.uid + '/filmList'))
      .then(snapshot => {
        let arrFilm = [];
        if (snapshot.exists()) {
          if ( snapshot.val() === "[]") {
            console.log(snapshot.val() === "[]")
          } else {
            arrFilm =JSON.parse(snapshot.val());
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

}
