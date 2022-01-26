import Form from './regForm';
import { config } from './configForm';
import Auth from './auth';
import { onOpenModal } from '../modal';
//import movieCard from '../templates/modal.hbs';
import { refs } from '../refs';
import { langs } from '../localization';

config.btnMyLabr.classList.toggle('visually-hidden');
const userForm = document.querySelector('.form-auth');
const btnCloseForm = document.querySelector('.modal__close-btn');
const btnSubmit = document.querySelector('.modal-form__submit');
const titleRegForm = document.querySelector('.modal-form__title');
refs.GLOBAL_IS_LIB = false;
refs.GLOBAL_IS_QUE = false;

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
  if (refs.modalInpName.classList.contains('visually-hidden')) {
    refs.modalInpName.classList.remove('visually-hidden');
    refs.modalInpNameIcon.classList.remove('visually-hidden');
    const divName = document.querySelector('.modal-form__title').nextSibling;
    if (refs.modalInpName.parentNode.classList.contains('visually-hidden')) {
      refs.modalInpName.parentNode.classList.remove('visually-hidden');
    }
  }
  userForm.classList.toggle('visually-hidden');
  btnSubmit.textContent = 'Sing Up';
  titleRegForm.textContent = 'Sing Up';
  //const objForm = new Form();
  if (langs === 'ru') {
    btnSubmit.textContent = 'Зарегистрироваться';
  }
  if (langs === 'uk') {
    btnSubmit.textContent = 'Зареєструватись';
  }
  if (langs === 'en') {
    btnSubmit.textContent = 'Sing Up';
  }

  titleRegForm.textContent = 'Sing Up';
  if (langs === 'ru') {
    titleRegForm.textContent = 'Зарегистрироваться';
  }
  if (langs === 'uk') {
    titleRegForm.textContent = 'Зареєструватись';
  }
  if (langs === 'en') {
    titleRegForm.textContent = 'Sing Up';
  }
});
////////////////////////////////////////////////
////////////////////////////////////////////////

config.btnLogIn.addEventListener('click', () => {
  let keys = Object.keys(localStorage);
  console.log('keys=', keys);
  for (let key of keys) {
    if (key === 'authorise') {
      // const storage = JSON.parse(localStorage.getItem(key));
      // if (storage != null) {
      //   config.nameArea.value = storage.name;
      //   config.passwordArea.value = storage.password;
      //   config.mailArea.value = storage.email;
      // }
    }
  }
  if (!refs.modalInpName.classList.contains('visually-hidden')) {
    refs.modalInpName.classList.add('visually-hidden');
    refs.modalInpNameIcon.classList.add('visually-hidden');
    if (!refs.modalInpName.parentNode.classList.contains('visually-hidden')) {
      refs.modalInpName.parentNode.classList.add('visually-hidden');
    }
  }

  userForm.classList.toggle('visually-hidden');
  btnSubmit.textContent = 'Sing In';
  titleRegForm.textContent = 'Sing In';
  if (langs === 'ru') {
    btnSubmit.textContent = 'Войти';
  }
  if (langs === 'uk') {
    btnSubmit.textContent = 'Увійти';
  }
  if (langs === 'en') {
    btnSubmit.textContent = 'Sing In';
  }
});
//////////////////////////////////////////////////////
btnCloseForm.addEventListener('click', () => {
  // console.log('click');
  userForm.classList.toggle('visually-hidden');
});
/////////////////////////////////////////////////
btnSubmit.addEventListener('click', e => {
  console.dir(btnSubmit);
  if (
    btnSubmit.textContent === 'Sing Up' ||
    btnSubmit.textContent === 'Зареєструватись' ||
    btnSubmit.textContent === 'Зарегистрироваться'
  ) {
    console.log('Registr');
    const form = new Form();
    form.btnRegClicked();
  }
  if (
    btnSubmit.textContent === 'Sing In' ||
    btnSubmit.textContent === 'Увійти' ||
    btnSubmit.textContent === 'Войти'
  ) {
    const form = new Form();
    form.btnLoginClicked();
  }
  userForm.classList.toggle('visually-hidden');
  //const form = new Form();
});
//////////////////////надо потерять это в auth////////////////////////////////

export function btnAddFilmClicked(film) {
  console.log('btnAddFilmClicked()');
  if (sessionStorage.getItem('logInUser') != null) {
    const auth = new Auth();
    auth.addToWatched(film);
  } else {
    if (langs === 'ru') {
      alert('Пользователь не зарегистрирован');
    }
    if (langs === 'uk') {
      alert('Користувач не зареєстрований');
    }
    if (langs === 'en') {
      alert('User is NOT LOGIN');
    }
    // alert('User is NOT LOGIN');
  }
}

export function btnDelFilmClicked(film) {
  console.log('btnDelFilmClicked()');
  const auth = new Auth();
  auth.delFilmWatched(film);
}

export function btnAddQueueClicked(film) {
  console.log('btnAddQueueClicked()');
  if (sessionStorage.getItem('logInUser') != null) {
    const auth = new Auth();
    auth.addQueueWatched(film);
  } else {
    if (langs === 'ru') {
      alert('Пользователь не зарегистрирован');
    }
    if (langs === 'uk') {
      alert('Користувач не зареєстрований');
    }
    if (langs === 'en') {
      alert('User is NOT LOGIN');
    }
    // alert('User is NOT LOGIN');
  }
}

export function btnDelQueueClicked(film) {
  console.log('btnDelQueueClicked()');
  const auth = new Auth();
  auth.delQueueWatched(film);
}

export function autoLogin() {
  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) === 'authorise') {
        const rez = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log('rez=', rez);
        const auth = new Auth();
        // newAuth.loginUser(newAuth.auth, rez.name, rez.email, rez.password)
      }
    }
  }
}
////////////////////////////////////////////////////////////////////////////
