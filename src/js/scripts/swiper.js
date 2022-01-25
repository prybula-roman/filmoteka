// import refs
// import { refs } from './refs';

// import scripts
// import FetchNowPlayingMovies from '../API/fetchNowPlayingMovies';
// import handleSwiperMovieCard from './handleSwiperMovieCard';

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';  
import 'swiper/swiper-bundle.css'
// const fetchNowPlayingMovies = new FetchNowPlayingMovies();

new Swiper('.swiper', {

  modules: [Navigation, Pagination, Autoplay],
  loop: true,
  spaceBetween: 10,
  speed: 100,
  slidesPerView: 7,
  slidesPerGroup:1,
  height: 600,
  touchRatio: 45,
  grabCursor: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets:true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 1500,
    stopOnLastSlide: true,
    disableOnInteraction: false
  },

  breakpoints: {
      768: {
      slidesPerView:5,
    },
      1024: {
      slidesPerView:7,
    },

  }
});
