import FetchSearchMovie from '../API/fetchSearchMovie';

import PopularMovies from '../API/fetchPopularMovie';

import handleMovieCard from './handleMovieCard';
import filmCard from '../templates/preview_card.hbs';
// import {onSwiperNowPlayingMovies} from '../scripts/swiper'

import { refs } from './refs';
import { debounce } from 'lodash';
import { onRenderPagination} from '../scripts/pagination';

import FetchNowPlayingMovies from '../API/fetchNowPlayingMovies';
import handleSwiperMovieCard from './handleSwiperMovieCard';
const fetchNowPlayingMovies = new FetchNowPlayingMovies();

export default onRenderPopularMoviesMarkup;

refs.formEl.addEventListener("input", debounce(onSubmit, 500));

const apiSearchData = new FetchSearchMovie();
const popularMovie = new PopularMovies();


onSwiperNowPlayingMovies()

function onSwiperNowPlayingMovies() {
  fetchNowPlayingMovies.fetchNowPlaying()
  .then(movies=> handleSwiperMovieCard(movies))
  
  JSON.parse(localStorage.getItem("currentSwiperPage")).map(films => {
    
    films.results.forEach(({id,poster_path,title,genre_ids}) => {
      const markupSwiper = ` <li class="swiper-slide"  id="${id}">
    <img class="swiper__poster" src="${poster_path}" alt="${title} poster"  loading="lazy" />
    <p class="swiper__name">${title}</p>
    <p class="swiper__genre">${genre_ids} </p>
    
</li>`
    
      refs.swiperEl.insertAdjacentHTML('beforeend', markupSwiper);
    })
  })
}


window.onload = function () {
  refs.bodyEl.style.overflow = 'hidden';
    window.setTimeout(function () {
        refs.preloaderEl.style.visibility = 'hidden';
        refs.preloaderEl.style.opacity = '0';
        refs.bodyEl.style.overflow = '';
      }, 1000);
}

onRenderPopularMoviesMarkup()


function onEnterIgnor() {
   refs.formEl.addEventListener("keypress", event => {   
    if (event.code === 'Enter') {  
      event.preventDefault();
    }
  });
}

function onRenderPopularMoviesMarkup() {
   refs.spinner.classList.remove('is-hidden');

  onEnterIgnor();
  
  popularMovie.fetchPopular()
    .then(film => {
      const markup = filmCard(handleMovieCard(film.results)); 
      refs.galleryEl.innerHTML = markup;
      onRenderPagination(film.total_pages, film.page); 
    })
  .catch(error => {
    popularMovie.fetchPopular()
    .then(film => {
      const markup = filmCard(handleMovieCard(film.results)); 
      refs.galleryEl.innerHTML = markup;
      onRenderPagination(film.total_pages, film.page); 
    })
  })
    .finally(() => {
    refs.spinner.classList.add('is-hidden');
  });
}

function onSubmit (event) {
  event.preventDefault();  

  onEnterIgnor();
  
  apiSearchData.query = event.target.value;

  if(apiSearchData.query === ""){
    onRenderPopularMoviesMarkup();
  }
  
  refs.galleryEl.innerHTML = '';
  apiSearchData.resetPage();
  onRenderPaginationMarkup();
}

function onRenderPaginationMarkup() {
  refs.spinner.classList.remove('is-hidden');

  if (apiSearchData.query === "") {
    return;
  }

  apiSearchData.fetchMovies()
    .then(film => {      
      const markup = filmCard(handleMovieCard(film.results)); 
      refs.galleryEl.innerHTML = markup;
      onRenderPagination(film.total_pages, film.page); 

      if(film.total_results ===0){
        refs.spinner.classList.add('is-hidden');
      }
  })
  .catch(error => 
    onRenderPopularMoviesMarkup()
    )
    .finally(() => {
    refs.spinner.classList.add('is-hidden');
  });
}
  export { apiSearchData, popularMovie };