import { signOut } from 'firebase/auth';
import Auth from './auth';

var validator = require('email-validator');

const config={
btnReg: document.getElementById('register'),
btnLogIn: document.getElementById('login'),
btnLogOut:document.getElementById('logout'),
nameArea:document.getElementById('full_name'),
passwordArea:document.getElementById('password'),
mailArea:document.getElementById('email')
}

export default class Form{
//--->
constructor(){
 console.log("I`m constructor of class Form" )
 const btnReg=config.btnReg;

btnReg.addEventListener('click',()=>{
    if(this.validateForm(this.nameAreaVal,this.mailAreaVal,this.nameAreaVal)){
        console.log(this.nameAreaVal)
        console.log(this.passwordAreaVal)
        console.log(this.mailAreaVal)
        
        const newAuth=new Auth(this.nameAreaVal,this.mailAreaVal,this.passwordAreaVal);
        newAuth.createNewUser(newAuth.auth,this.nameAreaVal,this.mailAreaVal,this.passwordAreaVal,newAuth.db);
        this.setNameAreaVal('');
        this.setMailAreaVal('');
        this.setPasswordAreaVal('');
    }else{
    
        alert('Not valid form');
    }
})

/////////////////////////////////////////
const btnLogIn=config.btnLogIn;
btnLogIn.addEventListener('click',()=>{
    if(this.validateForm(this.nameAreaVal,this.mailAreaVal,this.passwordAreaVal)){
        console.log(this.nameAreaVal)
        console.log(this.passwordAreaVal)
        console.log(this.mailAreaVal)
        
      const newAuth=new Auth(this.nameAreaVal,this.mailAreaVal,this.passwordAreaVal);
        newAuth.loginUser(newAuth.auth,this.nameAreaVal,this.mailAreaVal,this.passwordAreaVal,newAuth.db).then(()=>{
///////////////////////
const btnAddFilm=document.createElement("button");
btnAddFilm.innerHTML="addFilm";
config.btnLogOut.after(btnAddFilm)

const test="test";
btnAddFilm.addEventListener('click',()=>{
console.log("clicked ",btnAddFilm);
const testFilm=["testFilm1"]
newAuth.addFilmToUser(newAuth.auth,this.nameAreaVal,this.mailAreaVal,this.passwordAreaVal,newAuth.db,testFilm);



})



///////////////////////

console.log("return promise SingIn")

        }).catch(
            (e)=>{
alert(e.message);
            }
        );

        this.setNameAreaVal('');
        this.setMailAreaVal('');
        this.setPasswordAreaVal('');
        
    }else{
    
        alert('Not valid form');
    }

})
////////////////////////////////////////
const btnLogOut=config.btnLogOut;
btnLogOut.addEventListener('click',()=>{
    const newAuth=new Auth(this.nameAreaVal,this.mailAreaVal,this.passwordAreaVal);
    signOut(newAuth);
alert("singOut");
})
////////////////////////////////////////
 
}//<----

get config(){
    return config;
}

get nameAreaVal(){
    return config.nameArea.value;
}
 setNameAreaVal(str){
    config.nameArea.value=str;
}

get passwordAreaVal(){

    return config.passwordArea.value;
}
setPasswordAreaVal(str){
    config.passwordArea.value=str;
}

get mailAreaVal(){
   return config.mailArea.value;
}
setMailAreaVal(str){
    config.mailArea.value=str;

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
      if (password.length < 6) {
        return false;
      } else {
        return true;
      }
    }
  };
///////////////////////////////////////////
}

