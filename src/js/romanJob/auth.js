

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import {  setUserId } from 'firebase/analytics';
import {firebaseConfig} from "firebaseConfig";
import Form from "regForm" ;


 export default class Auth {
  // методы класса
  constructor() {
    //--->
      console.log(firebaseConfig)
      console.log("config=",firebaseConfig)
    //================================
  //  const fb = initializeApp(config);
   // console.log('fb=', fb);
    //получаем ссылку на БД
   // const database = getDatabase(fb);
   // console.log('database=', database);
    //создание экземпляра auth
   // const auth = getAuth();
    //console.log('auth=', auth);

  }
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