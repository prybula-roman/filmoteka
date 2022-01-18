import { signOut } from 'firebase/auth';
import Auth from './auth';
import { config } from './configForm';
var validator = require('email-validator');

// const config = {
//   btnReg: document.getElementById('register'),
//   btnLogIn: document.getElementById('login'),
//   btnLogOut: document.getElementById('logout'),
//   nameArea: document.getElementById('full_name'),
//   passwordArea: document.getElementById('password'),
//   mailArea: document.getElementById('email'),
// };

export default class Form {
  //--->
  constructor() {
    console.log('I`m constructor of class Form');
    
    /////////////////////////////////////////
  } //<----

///////////////////////////////////////////////////
  btnLogOutClicked(authorise){
    console.log("btnLogOutClicked");
const newAuth = new Auth(authorise.nameAreaVal, authorise.mailAreaVal, authorise.passwordAreaVal);
    newAuth
      .loginUser(
        newAuth.auth,
        this.nameAreaVal,
        this.mailAreaVal,
        this.passwordAreaVal,
        newAuth.db,
      )
      .then(() => {
     console.log(newAuth.singOutUser());  
      })

     
    config.btnLogIn.classList.toggle("visually-hidden");
    config.btnReg.classList.toggle("visually-hidden");
    config.btnLogOut.classList.toggle("visually-hidden");
    config.btnMyLabr.classList.toggle("visually-hidden");

    alert('singOut');

  }
/////////////////////////////////////////////////////
 btnLoginClicked(){
  if (this.validateForm(this.nameAreaVal, this.mailAreaVal, this.passwordAreaVal)) {
      console.log("btnLoginClicked()  this.nameAreaVal",this.nameAreaVal);
      console.log("btnLoginClicked()  this.nameAreaVal",this.passwordAreaVal);
      console.log("btnLoginClicked()  this.nameAreaVal",this.mailAreaVal);
console.log("btnLoginClicked()");
    const newAuth = new Auth(this.nameAreaVal, this.mailAreaVal, this.passwordAreaVal);
    newAuth
      .loginUser(
        newAuth.auth,
        this.nameAreaVal,
        this.mailAreaVal,
        this.passwordAreaVal,
        newAuth.db,
      )
      .then(() => {
        console.log('return from loginUser promise SingIn');
config.btnLogIn.classList.toggle("visually-hidden");
console.log("config.btnLogIn=",config.btnLogIn);
config.btnReg.classList.toggle("visually-hidden");
config.btnLogOut.classList.toggle("visually-hidden");
config.btnMyLabr.classList.toggle("visually-hidden");

//////////////////////////////////////////////////
//config.btnLogOut.addEventListener('click',this.btnLogOutClicked(newAuth))
console.log("localStorage=",localStorage);
console.log("***********************************");
console.log("this.nameAreaVal=",this.nameAreaVal);
console.log("this.passwordAreaVal=",this.passwordAreaVal);
console.log("this.mailAreaVal=",this.mailAreaVal);

localStorage.setItem("authorise",JSON.stringify({
  name: this.nameAreaVal,
  email: this.mailAreaVal,
  password:this.passwordAreaVal
}))
this.setNameAreaVal('');
this.setMailAreaVal('');
this.setPasswordAreaVal(''); 
      })
      .catch(e => {
        alert(e.message);
      });

   
  } else {
    alert('Not valid form');
  }
 }



  btnRegClicked() {
    console.log("btnRegClicked()")
    console.log(this.validName(this.nameAreaVal));
    console.log(this.validName(this.passwordAreaVal));
    console.log(this.validName(this.mailAreaVal));
    if (this.validateForm(this.nameAreaVal, this.mailAreaVal, this.passwordAreaVal)) {
      console.log(this.nameAreaVal);
      console.log(this.passwordAreaVal);
      console.log(this.mailAreaVal);
      const newAuth = new Auth(this.nameAreaVal, this.mailAreaVal, this.passwordAreaVal);
      newAuth.createNewUser(
        newAuth.auth,
        this.nameAreaVal,
        this.mailAreaVal,
        this.passwordAreaVal,
        newAuth.db,
      );
      this.setNameAreaVal('');
      this.setMailAreaVal('');
      this.setPasswordAreaVal('');
    } else {
      alert('Not valid form');
    }
  }

  get config() {
    return config;
  }

  get nameAreaVal() {
    return config.nameArea.value;
  }
  setNameAreaVal(str) {
    config.nameArea.value = str;
  }

  get passwordAreaVal() {
    return config.passwordArea.value;
  }
  setPasswordAreaVal(str) {
    config.passwordArea.value = str;
  }

  get mailAreaVal() {
    return config.mailArea.value;
  }
  setMailAreaVal(str) {
    config.mailArea.value = str;
  }
  /////////////////////////////////////
  validateForm(fullName, email, pass) {
    console.log(fullName);
    console.log(email);
    console.log(pass);
    if (this.validName(fullName) && this.validEmail(email) && this.validPasword(pass)) {
      return true;
    } else {
      alert('Not Valid Form');
    }
  }
  ///////////////////////////////////////
  ///////////////////////////////////////
  validName(fullName) {
    if (fullName) {
      return true;
    } else {
      return false;
    }
  }
  ///////////////////////////////////////
  ///////////////////////////////////////
  validEmail(email) {
    if (email) {
      if (validator.validate(`${email}`)) {
        return true;
      } else {
        return false;
      }
    }
  }
  /////////////////////////////////////////
  /////////////////////////////////////////
  validPasword(password) {
    if (password) {
      if (password.length < 6) {
        return false;
      } else {
        return true;
      }
    }
  }
  ///////////////////////////////////////////
}
