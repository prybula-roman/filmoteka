

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser,
  signOut
} from 'firebase/auth';
import { getDatabase, ref, set ,child,update} from 'firebase/database';
import {  setUserId } from 'firebase/analytics';
import {firebaseConfig} from "./firebaseConfig";
import Form from "./regForm" ;


 export default class Auth {
  // методы класса
  constructor(fullName,email,password) {
    //--->
    this.fbase = initializeApp(firebaseConfig);//хранится общая конфигурация и используется аутентификация для всех служб Firebase
      //создание экземпляра auth
    this.auth = getAuth();
      console.log("auth:",this.auth)
//получаем ссылку на БД
    this.db = getDatabase(this.fbase);

    console.log("db=",this.db)
    //================================
    
//this.createUserEmailAndPassword(fullName,email,password,auth);
  }
get database(){

    return this.db
}
///////////////////////////////////////
get fb(){
return this.fbase

}
get authentic(){
    return this.auth
}
///////////////////////////////////////////////////


  //////////////////////////////////////////////////
  createNewUser(auth,fullName,email, password,database){
    createUserWithEmailAndPassword(auth,email, password).then(()=>{
        //создаем профиль в БД
         set(ref(database, 'users/' + auth.currentUser.uid), {
            id:auth.currentUser.uid,
            name:fullName,
            mail:email,
            filmList:[""]
          });
        
        //this.createUserDB(fullName,email,auth);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
          })
  }
/////////////////////////////////////////////////////////////
readUser(){



}

/////////////////////////////////////////////////////////////
singOutUser(){
  signOut(this.auth)  ;
alert("singOut");
}
//////////////////////////////////////////////////////////////
addFilmToUser(auth,fullName,email, password,database,film){
console.log("database=",database)
    // set(ref(database, `users/${auth.currentUser.uid}`), {
    //     nameFilm:"test2"
    //   });
console.log("JSON.stringify(film)",JSON.stringify(film))
console.log("film=",film)
console.log("auth.currentUser.uid=",auth.currentUser.uid)
//for(let i= 0;i!=update_data.filmList.length;i++){
set(ref(database, 'users/' +auth.currentUser.uid+"/filmList"),film).then(()=>{

console.log("aLL GooD");

}).catch((error)=>{

  console.log(error.message);
})
//}
//update(ref(database, 'users/' +auth.currentUser.uid.filmList ),update_data.filmList)
}


  ///////////////////////////////////////////////////////////////////////////////            

loginUser(auth,fullName,email, password,database){
    console.log("loginUser");

  const promise= signInWithEmailAndPassword(auth,email, password);
promise.catch((e)=>{
alert(e.message);
});
alert('loginUser()  SingIn');
return promise;
}
   /////////////////////////////////////////////////////////////////////////////     
//   createUserDB(fullname, email,auth){
//     fetch('https://test-963ff-default-rtdb.europe-west1.firebasedatabase.app/users.json',{
//         method: 'POST',
//         body:JSON.stringify( {
//           id: auth.currentUser.uid,
//           name:fullname,
//           mail:email,
//           filmList:[]
//         }),
//         headers: {'Content-Type': 'application.json'}
//         }).then((response)=>
//              response.json()
//         ).then((response)=>{
//           console.log("response",response);
//         }).catch((error)=>{
// console.log("ERRROR");
// alert(error.message);
//         })
//   }
}
/*
    /////////////////////////////////////////////////////////////////////////////
    
    //console.log('btnReg=', btnReg);
    btnReg.addEventListener('click', () => {
      const fullName = (document.getElementById('full_name').value = 'test');
     // console.log('fullName=', fullName);
      
      validName(fullName);
      /////////////////////////////////////////////////////////////////////////////
      const email = document.getElementById('email').value;
      console.log('email=', email);
     
      validEmail(email);
      /////////////////////////////////////////////////////////////////////////////
      const password = (document.getElementById('password').value = '123456');
     // console.log('password', password);
      
      validPasword(password);

      if (validName && validPasword && validEmail) {
        console.log('***************************');
       /////////////////////////////////////////

       fetch('https://test-963ff-default-rtdb.europe-west1.firebasedatabase.app/users.json',{
        method: 'POST',
        body:JSON.stringify( {
        //  id: auth.currentUser.uid,
          name:fullName,
          mail:email,
          filmList:["FILM1","FILM2"]
        }),
        headers: {'Content-Type': 'application.json'}
        }).then((response)=>
         // console.log("%%%%%%%%%%%%%%%%%%%%")
             response.json()
        ).then((response)=>{
          console.log("response",response);
        }).catch((error)=>{
console.log("ERRROR");
        })
    
       /////////////////////////////////////////
        // createUserWithEmailAndPassword(auth, email, password)
        //   .then(() => {
        //     // Signed in

        //     console.log('############################');
        //     const user = auth.currentUser;
        //     console.log('user=', user);
        //     const addUser = {
        //       email: email,
        //       // password: password,
        //       name: fullName,
        //     };

        //     function writeUserData(useruid,name, email) {
        //       console.log('useruid=', useruid);
        //       console.log("name=",name);
        //       console.log("email=",email);
        //       console.log('ref=', ref(database, 'users/' + user.uid));

        //       // set(ref(database, 'users/' + user.uid), addUser);
        //       //set(ref(database, 'users/' + user.uid)), {
              
        //        set(ref(database, 'users/' + user.uid), {
        //           username: name,
        //           email: email,
        //       });
        //       console.log(set(ref(database, 'users/' + user.uid), addUser));

              
        //     }
        //     console.log('addUser.name=', addUser.name, '  addUser.email=', addUser.email);
        //     writeUserData(user.uid,addUser.name, addUser.email);
        //     // ...
        //   })
        //   .catch(error => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorCode);
        //     console.log(errorMessage);
        //     alert(errorMessage);
        //     // ..
        //   });
      }
    });

//<---         
}
}


*/
//export {Auth}