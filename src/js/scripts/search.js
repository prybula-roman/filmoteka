import FetchSearchMovie from '../API/fetchSearchMovie';

import PopularMovies from '../API/fetchPopularMovie';
import { onRenderPagination} from '../scripts/pagination'
import handleMovieCard from './handleMovieCard';
import filmCard from '../templates/preview_card.hbs';
// import {onSwiperNowPlayingMovies} from '../scripts/swiper'

import { refs } from './refs';

import FetchNowPlayingMovies from '../API/fetchNowPlayingMovies';
import handleSwiperMovieCard from './handleSwiperMovieCard';
const fetchNowPlayingMovies = new FetchNowPlayingMovies();

export default onRenderPopularMoviesMarkup;

refs.formEl.addEventListener("input", onSubmit);

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


onRenderPopularMoviesMarkup()


function onEnterIgnor() {
   refs.formEl.addEventListener("keypress", event => {   
    if (event.code === 'Enter') {  
      event.preventDefault();
    }
  });
}
function onRenderPopularMoviesMarkup(genresArr) {
   refs.spinner.classList.remove('is-hidden');

  onEnterIgnor();
  
  popularMovie.fetchPopular()
    .then(film => {
      const markup = filmCard(handleMovieCard(film.results, genresArr)); 
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

  apiSearchData.fetchMovies()
    .then(film => {      
      const markup = filmCard(handleMovieCard(film.results)); 
      refs.galleryEl.innerHTML = markup;
      onRenderPagination(film.total_pages, film.page); 
  })
  .catch(error => console.log(error))
    .finally(() => {
    refs.spinner.classList.add('is-hidden');
  });
}
  export { apiSearchData, popularMovie };