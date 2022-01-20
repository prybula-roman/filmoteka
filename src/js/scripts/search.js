import FetchSearchMovie from  '../API/fetchSearchMovie';
import PopularMovies from '../API/fetchPopularMovie';

import handleMovieCard from './handleMovieCard';
import filmCard from '../templates/preview_card.hbs';

import { refs } from './refs';
import { debounce } from 'lodash';
import { onRenderPagination} from '../scripts/pagination';

export default onRenderPopularMoviesMarkup;

refs.formEl.addEventListener("input", debounce(onSubmit, 500));

const apiSearchData = new FetchSearchMovie();
const popularMovie = new PopularMovies();

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
      if (apiSearchData.query === "" && genreValue === '' && yearValue === '') {
        onRenderPopularMoviesMarkup(genresArr);
  }
  if (genreValue !== '' || yearValue!== '') {
          createCard(genreValue, yearValue);
          return
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