import { signOut } from 'firebase/auth';
import Auth from './auth';
import { config } from './configForm';
var validator = require('email-validator');
import { refs } from '../refs';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';
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
    // console.log('I`m constructor of class Form');
    /////////////////////////////////////////
  } //<----

  ///////////////////////////////////////////////////
  btnLogOutClicked(auth) {
    console.log('auth=', auth);
    const newAuth = new Auth(auth.name, auth.email, auth.password);
    newAuth.singOutUser(newAuth.auth);
  }
  /////////////////////////////////////////////////////
  btnLoginClicked() {
    refs.GLOBAL_IS_LOG_FORM = true;
    refs.GLOBAL_IS_REG_FORM = false;
    console.log('this.nameAreaVal=', this.nameAreaVal);
    if (this.validateForm(this.nameAreaVal, this.mailAreaVal, this.passwordAreaVal)) {
      const newAuth = new Auth();
      newAuth.loginUser(newAuth.auth, this.nameAreaVal, this.mailAreaVal, this.passwordAreaVal);
      this.setNameAreaVal('');
      this.setMailAreaVal('');
      this.setPasswordAreaVal('');
    } else {
      alert('Not valid form');
    }
  }

  btnRegClicked() {
    refs.GLOBAL_IS_LOG_FORM = false;
    refs.GLOBAL_IS_REG_FORM = true;
    if (this.validateForm(this.nameAreaVal, this.mailAreaVal, this.passwordAreaVal)) {
      const newAuth = new Auth();
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
    // console.log(fullName);
    // console.log(email);
    // console.log(pass);
    if (refs.GLOBAL_IS_LOG_FORM) {
      if (this.validEmail(email) && this.validPasword(pass)) {
        return true;
      } else {
        alert('Not Valid email/password');
      }
    }
    if (refs.GLOBAL_IS_REG_FORM) {
      if (this.validName(fullName) && this.validEmail(email) && this.validPasword(pass)) {
        return true;
      } else {
        alert('Not Valid Reg Form');
      }
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
