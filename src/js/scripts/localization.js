import { refs } from './refs';

import pageLang from '../scripts/templates/PageLang';


 function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
  const savedData = localStorage.getItem(key);
     return JSON.parse(savedData);
}

refs.enEl.addEventListener('click', changeEnLanguage);
refs.ruEl.addEventListener('click', changeRuLanguage);
refs.ukEl.addEventListener('click', changeUkLanguage);

function changeEnLanguage() {
  let lang = 'en';
  setLanguageData(lang);
  setLocalStorage('lang', lang);
}
function changeRuLanguage() {
  let lang = 'ru';
  setLanguageData(lang);
  setLocalStorage('lang', lang);
}
function changeUkLanguage() {
  let lang = 'uk';
  setLanguageData(lang);
  setLocalStorage('lang', lang);
}
let langs = getLocalStorage('lang');
if (langs === 'uk') {
  setLanguageData('uk');
}
if (langs === 'ru') {
  setLanguageData('ru');
}
if (langs === 'en') {
  setLanguageData('en');
}

function setLanguageData(lang) {
  for (let key in pageLang ) {
    document.querySelector('.lang-' + key).textContent = `${pageLang[key][`${lang}`]}`;
    document.querySelector('.lang-input').placeholder = `${pageLang.input[`${lang}`]}`;
  }
}


