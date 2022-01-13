import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { getAnalytics, setUserId } from 'firebase/analytics';

var validator = require('email-validator');

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

class Auth {
  // методы класса
  constructor() {
    //--->
    console.log('Auth welcome');
    const firebaseConfig = {
      apiKey: 'AIzaSyBIzux_2y2qnxWzr05-oqTQcK-YE0UD-zE',
      authDomain: 'registredusers.firebaseapp.com',
      projectId: 'registredusers',
      storageBucket: 'registredusers.appspot.com',
      messagingSenderId: '327609187484',
      appId: '1:327609187484:web:73bd2caac6a3bd86c74159',
      measurementId: 'G-11D2YEEE1H',
    };

    const fb = initializeApp(firebaseConfig);
    console.log('fb=', fb);
    //получаем ссылку на БД
    const database = getDatabase(fb);
    console.log('database=', database);
    //создание экземпляра auth
    const auth = getAuth();
    console.log('auth=', auth);

    /////////////////////////////////////////////////////////////////////////////
    const btnReg = document.getElementById('regiter');
    console.log('btnReg=', btnReg);
    btnReg.addEventListener('click', () => {
      const fullName = (document.getElementById('full_name').value = 'test');
      console.log('fullName=', fullName);
      const validName = fullName => {
        if (fullName) {
          return true;
        } else {
          return false;
        }
      };
      validName(fullName);
      /////////////////////////////////////////////////////////////////////////////
      const email = document.getElementById('email').value;
      console.log('email=', email);
      const validEmail = email => {
        console.log(validator.validate(`${email}`)); // true
        if (email) {
          if (validator.validate(`${email}`)) {
            return true;
          } else {
            return false;
          }
        }
      };
      validEmail(email);
      /////////////////////////////////////////////////////////////////////////////
      const password = (document.getElementById('password').value = '123456');
      console.log('password', password);
      const validPasword = password => {
        if (password) {
          console.log('valid_password');
          if (password.length < 6) {
            return false;
          } else {
            return true;
          }
        }
      };
      validPasword(password);
      //////////////////////////////////////////////////////////////////////////////
      console.log('validPassword=', validPasword(password));
      console.log('validEmail=', validEmail(email));
      console.log('validName=', validName(fullName));

      /////////////////////////////////////////////////////////////////
      if (validName && validPasword && validEmail) {
        console.log('***************************');
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            // Signed in

            console.log('############################');
            const user = auth.currentUser;
            console.log('user=', user);
            const addUser = {
              email: email,
              // password: password,
              name: fullName,
            };

            function writeUserData(name, email) {
              console.log('user.uid=', user.uid);
              console.log('ref=', ref(database, 'users/' + user.uid));

              set(ref(database, 'users/' + user.uid), addUser);

              console.log(set(ref(database, 'users/' + user.uid), addUser));
            }

            console.log('addUser.name=', addUser.name, '  addUser.email=', addUser.email);
            writeUserData(addUser.name, addUser.email);
          })
          // .then(() => {
          //   const addUser = {
          //     email: email,
          //     // password: password,
          //     name: fullName,
          //   };

          //   function writeUserData(userId, name, email) {
          //     console.log('ref=', ref(database, 'users/' + userId));

          //     set(ref(database, 'users/' + userId), addUser);
          //   }
          // })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert(errorMessage);
            // ..
          });
      }
    });

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(() => {
    //     // Signed in
    //     const user = auth.currentUser();
    //     console.log('user=', user);
    //     const db = database.ref();
    //     console.log('ref=', ref);
    //     // ...
    //   })
    //   .catch(error => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //     // ..
    //   });

    /**
     * Handles the sign in button press.
     */
    //   toggleSignIn() {
    //     if (firebase.auth().currentUser) {
    //       firebase.auth().signOut();
    //     } else {
    //       var email = document.getElementById('email').value;
    //       var password = document.getElementById('password').value;
    //       if (email.length < 4) {
    //         alert('Please enter an email address.');
    //         return;
    //       }
    //       if (password.length < 4) {
    //         alert('Please enter a password.');
    //         return;
    //       }
    //       // Sign in with email and pass.
    //       firebase
    //         .auth()
    //         .signInWithEmailAndPassword(email, password)
    //         .catch(function (error) {
    //           // Handle Errors here.
    //           var errorCode = error.code;
    //           var errorMessage = error.message;
    //           if (errorCode === 'auth/wrong-password') {
    //             alert('Wrong password.');
    //           } else {
    //             alert(errorMessage);
    //           }
    //           console.log(error);
    //           document.getElementById('quickstart-sign-in').disabled = false;
    //         });
    //     }
    //     document.getElementById('quickstart-sign-in').disabled = true;
    //   }

    /**
     * Handles the sign up button press.
     */
    //   handleSignUp() {
    //     var email = document.getElementById('email').value;
    //     var password = document.getElementById('password').value;
    //     if (email.length < 4) {
    //       alert('Please enter an email address.');
    //       return;
    //     }
    //     if (password.length < 4) {
    //       alert('Please enter a password.');
    //       return;
    //     }
    //     // Create user with email and pass.
    //     firebase
    //       .auth()
    //       .createUserWithEmailAndPassword(email, password)
    //       .catch(function (error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         if (errorCode == 'auth/weak-password') {
    //           alert('The password is too weak.');
    //         } else {
    //           alert(errorMessage);
    //         }
    //         console.log(error);
    //       });
    //   }

    /**
     * Sends an email verification to the user.
     */
    //   sendEmailVerification() {
    //     firebase
    //       .auth()
    //       .currentUser.sendEmailVerification()
    //       .then(function () {
    //         // Email Verification sent!
    //         alert('Email Verification Sent!');
    //       });
    //   }

    //   sendPasswordReset() {
    //     var email = document.getElementById('email').value;
    //     firebase
    //       .auth()
    //       .sendPasswordResetEmail(email)
    //       .then(function () {
    //         // Password Reset Email Sent!
    //         alert('Password Reset Email Sent!');
    //       })
    //       .catch(function (error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         if (errorCode == 'auth/invalid-email') {
    //           alert(errorMessage);
    //         } else if (errorCode == 'auth/user-not-found') {
    //           alert(errorMessage);
    //         }
    //         console.log(error);
    //       });
    //   }

    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    //   initApp() {
    //     // Listening for auth state changes.
    //     firebase.auth().onAuthStateChanged(function (user) {
    //       document.getElementById('quickstart-verify-email').disabled = true;
    //       if (user) {
    //         // User is signed in.
    //         var displayName = user.displayName;
    //         var email = user.email;
    //         var emailVerified = user.emailVerified;
    //         var photoURL = user.photoURL;
    //         var isAnonymous = user.isAnonymous;
    //         var uid = user.uid;
    //         var providerData = user.providerData;
    //         document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
    //         document.getElementById('quickstart-sign-in').textContent = 'Sign out';
    //         document.getElementById('quickstart-account-details').textContent = JSON.stringify(
    //           user,
    //           null,
    //           '  ',
    //         );
    //         if (!emailVerified) {
    //           document.getElementById('quickstart-verify-email').disabled = false;
    //         }
    //       } else {
    //         // User is signed out.
    //         document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
    //         document.getElementById('quickstart-sign-in').textContent = 'Sign in';
    //         document.getElementById('quickstart-account-details').textContent = 'null';
    //       }
    //       document.getElementById('quickstart-sign-in').disabled = false;
    //     });

    //     document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    //     document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    //     document
    //       .getElementById('quickstart-verify-email')
    //       .addEventListener('click', sendEmailVerification, false);
    //     document
    //       .getElementById('quickstart-password-reset')
    //       .addEventListener('click', sendPasswordReset, false);
    //   }

    //window.onload
  } //<---
}

export { Auth };
