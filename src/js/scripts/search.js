import FetchSearchMovie from  '../API/fetchSearchMovie';
import PopularMovies from '../API/fetchPopularMovie';
import { onRenderPagination} from '../scripts/pagination'
import handleMovieCard from './handleMovieCard';
import filmCard from '../templates/preview_card.hbs';

import { refs } from './refs';

export default onRenderPopularMoviesMarkup;

refs.formEl.addEventListener("input", onSubmit);

const apiSearchData = new FetchSearchMovie();
const popularMovie = new PopularMovies();

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