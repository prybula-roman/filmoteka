import Form from './regForm';
import { config } from './configForm';

console.log(config);
const form = document.querySelector('.form-auth');
config.btnReg.addEventListener('click', () => {
  form.classList.toggle('visually-hidden');
  //const objForm = new Form();
});
const btnCloseForm = document.querySelector('.modal__close-btn');
btnCloseForm.addEventListener('click', () => {
  console.log('click');
  form.classList.toggle('visually-hidden');
});

//config.btnAddFilm.classList.toggle('visually-hidden');
//console.log(config.btnAddFilm);
const btnSingUpForm = document.querySelector('.modal-form__submit');
btnSingUpForm.addEventListener('click', () => {
  const form = new Form();
  form.btnRegClicked();
  console.log(form);
});
