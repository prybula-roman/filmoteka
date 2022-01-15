var validator = require('email-validator');

const config={
btnReg: document.getElementById('register'),
btnLogIn: document.getElementById('login'),
nameArea:document.getElementById('full_name'),
passwordArea:document.getElementById('password'),
mailArea:document.getElementById('email')
}

export default class Form{
constructor(btnID){
    const btnReg = config.btnReg;
console.log(config);
}
/////////////////////////////////////
validateForm(fullName,email,pass){
if(this.validName(fullName) &&
this.validEmail(email) && 
this.validPasword(pass)
){
    return true
}else{

    alert("Not Valid Form")
}
}
///////////////////////////////////////
///////////////////////////////////////
validName (fullName) {
    if (fullName) {
      return true;
    } else {
      return false;
    }
  };
///////////////////////////////////////
///////////////////////////////////////
 validEmail(email)  {
    console.log(validator.validate(`${email}`)); // true
    if (email) {
      if (validator.validate(`${email}`)) {
        return true;
      } else {
        return false;
      }
    }
  };
/////////////////////////////////////////
/////////////////////////////////////////
validPasword(pass) {
    if (password) {
      console.log('valid_password');
      if (password.length < 6) {
        return false;
      } else {
        return true;
      }
    }
  };
///////////////////////////////////////////
}

