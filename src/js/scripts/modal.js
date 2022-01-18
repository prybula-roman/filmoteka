// import js
import { refs } from './refs';

// import templates
import movieCard from '../templates/modal.hbs';
import trailer from '../API/fetchTrailer';
import { currentTheme } from './toggle-theme';

//////////////////////roman/////////////
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser,
  signOut
} from 'firebase/auth';
import { getDatabase, ref, set ,child,update,get} from 'firebase/database';
import Auth from './authForm/auth';
////////////////////////////////////////

refs.openModalEl.addEventListener('click', onOpenModal);
refs.backdropEl.addEventListener('click', onBackdropClick);

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.bodyEl.classList.remove('show-modal');
  refs.closeModalEl.removeEventListener('click', onCloseModal);
  refs.modalEl.classList.add('js-backdrop');
}


function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onOpenModal(e) {
  e.preventDefault();

  if ( currentTheme === 'dark-theme') {
    refs.modalWindowEl.classList.add('dark-theme');
   } else {
     refs.modalWindowEl.classList.remove('dark-theme'); 
   }
  window.addEventListener('keydown', onEscKeyPress);
  refs.closeModalEl.addEventListener('click', onCloseModal);

  if (e.target.classList.value === 'movies') {
  return
  }

  const currentFilmId = Number(e.target.closest('li').id);

  return JSON.parse(localStorage.getItem("currentPage")).map(films => {
   films.forEach(film => {
     if (currentFilmId === film.id ) {
        
console.log("film=",film);


      const markupModal = movieCard(film);
      
      refs.modalmarkupEl.innerHTML = '';
      refs.modalmarkupEl.insertAdjacentHTML('beforeend', markupModal);
      refs.bodyEl.classList.add('show-modal');
  
  
      /////////////////////roman////////////////////
      const btnAddFilm =  document.querySelector(".add-to-watch");

      btnAddFilm.addEventListener("click",()=>{
        const fullName=JSON.parse(localStorage.getItem('authorise')).name
        const email=JSON.parse(localStorage.getItem('authorise')).email
        const password=JSON.parse(localStorage.getItem('authorise')).password
            console.log("fullName=",fullName)
            console.log("email=",email)
            console.log("fullName=",password)

        const newAuth=new Auth(fullName,email,password);
          console.log(" *********  auth.database=",newAuth.db)
          console.log(" *********  newAuth.auth=",newAuth.auth)

          console.log(localStorage.getItem("authorise"))

          newAuth.loginUser(newAuth.auth,fullName,email, password,newAuth.db).then(()=>{
            console.log("**fullName=",fullName)
            console.log("**email=",email)
            console.log("**fullName=",password)
///////читаем список фильмов в массив///////////////////////
console.log("newAuth.currentUser.uid=",newAuth.auth.currentUser.uid)
get(ref(newAuth.db, 'users/' +newAuth.auth.currentUser.uid+"/filmList")).then((snapshot) => {
  
  if (snapshot.exists()) {

    const filmArray=[];
    console.log("snapshot=",snapshot);
   // console.log("typeof snapshot.val()=",typeof snapshot.val());
   // console.log("snapshot.val()=",snapshot.val());
   // console.log("snapshot.val()[0]=",snapshot.val()[0]);
   // console.log("film=",film);
    if(snapshot.val()!=''){
     console.log("******************************")
     console.log("snapshot.val()=",snapshot.val())

     filmArray.push(JSON.stringify(snapshot.val()));

     console.log("###########################")
     filmArray.push(JSON.stringify(film));
   console.log(filmArray.length)
    }else{
     // snapshot.val().push(JSON.stringify(film));
     filmArray[0]=JSON.stringify(film);
     //filmArray.push(JSON.stringify(film));
    }
   


    newAuth.addFilmToUser(newAuth.auth,fullName,email, password,newAuth.db,JSON.stringify(filmArray));
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error.message);
});



/////////////////////////////////////////////////////////////////

            
          }).catch((error)=>{
alert(error.message);
          });
         
      });
/////////////////////////////////////////////////////////
      


      trailer.onPlayTrailer(document.querySelectorAll('.playTrailer'));
      }  
     })
  })
}
