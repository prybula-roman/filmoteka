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
  btnSubmit.textContent = 'Sing Up';

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
  btnSubmit.textContent = 'Sing In';

  if (langs === 'ru') {
    btnSubmit.textContent = 'Войти';
  }
  if (langs === 'uk') {
    btnSubmit.textContent = 'Увійти';
  }
  if (langs === 'en') {
    btnSubmit.textContent = 'Sing In';
  }
  titleRegForm.textContent = 'Sing In';
  if (langs === 'ru') {
    titleRegForm.textContent = 'Войти';
  }
  if (langs === 'uk') {
    titleRegForm.textContent = 'Увійти';
  }
  if (langs === 'en') {
    titleRegForm.textContent = 'Sing In';
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
    console.log('LOGIN');
    const form = new Form();
    form.btnLoginClicked();
  }
  userForm.classList.toggle('visually-hidden');
  //const form = new Form();
});

//////////////////////////////////////////////////////

export function btnAddFilmClicked(film) {
  console.log('btnAddFilmClicked()');
  const auth = new Auth();
  auth.addToWatched(film);
}

export function btnDelFilmClicked(film) {
  console.log('btnDelFilmClicked()');
  const auth = new Auth();
  auth.delFilmWatched(film);
}
