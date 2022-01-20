// import refs
// import { refs } from './refs';

// import scripts
import FetchNowPlayingMovies from '../API/fetchNowPlayingMovies';
// import handleSwiperMovieCard from './handleSwiperMovieCard';

// import Swiper JS
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';  

// import Swiper css
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
  }
  
});


// function onSwiperNowPlayingMovies() {
//   fetchNowPlayingMovies.fetchNowPlaying()
//   .then(movies=> handleSwiperMovieCard(movies))
  
//   JSON.parse(localStorage.getItem("currentSwiperPage")).map(films => {
    
//     films.results.forEach(({id,poster_path,title,genre_ids}) => {
//       const markupSwiper = ` <li class="swiper-slide"  id="${id}">
//     <img class="swiper__poster" src="${poster_path}" alt="${title} poster"  loading="lazy" />
//     <p class="swiper__name">${title}</p>
//     <p class="swiper__genre">${genre_ids} </p>
    
// </li>`
    
//       refs.swiperEl.insertAdjacentHTML('beforeend', markupSwiper);
//     })
//   })
// }

// export {onSwiperNowPlayingMovies}