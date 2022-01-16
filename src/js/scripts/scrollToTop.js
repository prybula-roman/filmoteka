// import throttle library 
import throttle from 'lodash.throttle';

// import js
import { refs } from './refs';

window.addEventListener('scroll', throttle(hideToTopButton, 250));
refs.toTopButtonEl.addEventListener('click', onToTopBtnClick);

function hideToTopButton() {  
  let clientHeight = document.documentElement.clientHeight;
  
  if (scrollY < clientHeight) {
    refs.toTopButtonEl.classList.add('visually-hidden') 
  }
  else {
    refs.toTopButtonEl.classList.remove('visually-hidden') 
    }  
}

function onToTopBtnClick() {
  scrollToTop();  
}

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
}
