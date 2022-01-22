import Form from './regForm';
import { config } from './configForm';

console.log(config);

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
  btnSubmit.innerHTML = 'Sing Up';
  titleRegForm.textContent = 'Sing Up';
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
  titleRegForm.textContent = 'Sing In';
});
//////////////////////////////////////////////////////
btnCloseForm.addEventListener('click', () => {
  console.log('click');
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
