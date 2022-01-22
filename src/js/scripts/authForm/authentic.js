import Form from './regForm';
import { config } from './configForm';
import Auth from './auth';
import {onOpenModal} from '../modal';
//import movieCard from '../templates/modal.hbs';
import { refs } from '../refs';


refs.openModalEl.addEventListener('click', (e)=>{

console.log("refs.openModalEl=",refs.openModalEl);

//e.preventDefault();
console.log("e=",e) ;
const currentFilmId = Number(e.target.closest('li').id);
console.log("currentFilmId=",currentFilmId);
if (sessionStorage.getItem('logInUser')!=null) {
      //  document.querySelector('.add-to-queue').setAttribute('disabled', false);
        document.querySelector('.add-to-watch').setAttribute('disabled', false);  
        btnAddFilmClicked(e); 
       if (document.querySelector('.my-library-movies')) {
        const btnDel = document.querySelector('.del-to-queue');
        btnDel.addEventListener('click', btnDelFilmClicked() );
      }
      document.querySelector('.add-to-watch').addEventListener('click',btnAddFilmClicked());
      }else{
      //  document.querySelector('.add-to-queue').setAttribute('disabled', true);
        document.querySelector('.add-to-watch').setAttribute('disabled', true);
      //  console.log(document.querySelector('.add-to-queue'));
      //  console.log(document.querySelector('.add-to-watch'));  
      }
     
   //   document.querySelector('.add-to-queue').addEventListener('click',btnAddFilmClicked());
});

config.btnMyLabr.classList.toggle('visually-hidden');
const userForm = document.querySelector('.form-auth');
const btnCloseForm = document.querySelector('.modal__close-btn');
const btnSubmit = document.querySelector('.modal-form__submit');

for (let i = 0; i < sessionStorage.length; i++) {
  sessionStorage.removeItem(sessionStorage.key(i));
}

//////////////////////////////////////////////////
config.btnLogOut.addEventListener('click', () => {
  const form = new Form();
  form.btnLogOutClicked(JSON.parse(sessionStorage.getItem('logInUser')));
});
//////////////////////////////////////////////////
/////////////////////////////////////////////////
config.btnReg.addEventListener('click', () => {
  userForm.classList.toggle('visually-hidden');
  btnSubmit.innerHTML = 'Sing Up';
  //const objForm = new Form();
});
////////////////////////////////////////////////
////////////////////////////////////////////////

config.btnLogIn.addEventListener('click', () => {
  let keys = Object.keys(localStorage);
  console.log('keys=', keys);
  for (let key of keys) {
    if (key === 'authorise') {
      const storage = JSON.parse(localStorage.getItem(key));
      if (storage != null) {
        config.nameArea.value = storage.name;
        config.passwordArea.value = storage.password;
        config.mailArea.value = storage.email;
      }
    }
  }
  userForm.classList.toggle('visually-hidden');
  btnSubmit.innerHTML = 'Sing In';
});
//////////////////////////////////////////////////////
btnCloseForm.addEventListener('click', () => {
 // console.log('click');
  userForm.classList.toggle('visually-hidden');
});
/////////////////////////////////////////////////
btnSubmit.addEventListener('click', e => {
  console.dir(btnSubmit);
  if (btnSubmit.innerHTML === 'Sing Up') {
    console.log('Registr');
    const form = new Form();
    form.btnRegClicked();
  }

  if (btnSubmit.innerHTML === 'Sing In') {
    console.log('LOGIN');
    const form = new Form();
    form.btnLoginClicked();
  }
  userForm.classList.toggle('visually-hidden');
  //const form = new Form();
});
//////////////////////////////////////////////////////




// setInterval(()=>{
//   //console.log("setTimeout()")
//   if (document.querySelector('.add-to-watch')!=null) {
//   //  console.log(document.querySelector('.add-to-watch'))
// //    console.log("sessionStorage.getItem('logInUser')=",sessionStorage.getItem('logInUser'))

//     if (sessionStorage.getItem('logInUser')!=null) {
//       document.querySelector('.add-to-queue').setAttribute('disabled', false);
//       document.querySelector('.add-to-watch').setAttribute('disabled', false);
    

//       document.querySelector('.add-to-watch').addEventListener('click',btnAddFilmClicked());
//      if (document.querySelector('.my-library-movies')) {
//       const btnDel = document.querySelector('.del-to-queue');
//       btnDel.addEventListener('click', btnDelFilmClicked() );
//     }

//     }else{
//       document.querySelector('.add-to-queue').setAttribute('disabled', true);
//       document.querySelector('.add-to-watch').setAttribute('disabled', true);

//     }
     
//   }
  
  
// },1000);

 function btnAddFilmClicked(e){
  console.log("btnAddFilmClicked()")
  const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
  const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
  const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
  
   //console.log(document.querySelector('.add-to-watch'));
   const auth = new Auth(fullName, email, password);
   //const btnAddFilm = document.querySelector('.add-to-watch'); 
   //const currentFilmId = Number(e.target.closest('li').id);
   
   const films= JSON.parse(localStorage.getItem('currentPage')).map(films => {
    // films.forEach(film => {
    //   if (currentFilmId === film.id) {
    //     ///////////////////////////////////////// 
    //     auth.addToWatched(film);
    // ////////////////////////////////////////////
    //   }
    // });
  });
  console.log("films=",films)
 }



 function btnDelFilmClicked(){
   console.log("btnDelFilmClicked()")
  const fullName = JSON.parse(sessionStorage.getItem('logInUser')).name;
  const email = JSON.parse(sessionStorage.getItem('logInUser')).email;
  const password = JSON.parse(sessionStorage.getItem('logInUser')).password;
   const auth = new Auth(fullName, email, password);
   const btnAddFilm = document.querySelector('.add-to-watch'); 
   const currentFilmId = Number(e.target.closest('li').id); 
   JSON.parse(localStorage.getItem('currentPage')).map(films => {
    films.forEach(film => {
      if (currentFilmId === film.id) {
        /////////////////////////////////////////
       auth.delFilmWatched(film);
      }
    });
  });

 }


