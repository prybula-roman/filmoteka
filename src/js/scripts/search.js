import FetchSearchMovie from  '../API/fetchSearchMovie';
import PopularMovies from '../API/fetchPopularMovie';
import handleMovieCard from './handleMovieCard';
import filmCard from '../templates/preview_card.hbs';

import { refs } from './refs';

export default onRenderPopularMoviesMarkup;

refs.formEl.addEventListener("input", onSubmit);
refs.loadMoreBtn.addEventListener('click', onRenderPopularMoviesMarkup);

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
    })
  .catch(error => {
    popularMovie.fetchPopular()
    .then(film => {
      const markup = filmCard(handleMovieCard(film.results)); 
      refs.galleryEl.innerHTML = markup;
    })
  })
    .finally(() => {
    refs.spinner.classList.add('is-hidden');
  });
}

function onSubmit (event) {
  refs.loadMoreBtn.removeEventListener('click', onRenderPopularMoviesMarkup);
  refs.loadMoreBtn.addEventListener('click', onRenderPaginationMarkup);
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
  })
  .catch(error => console.log(error))
    .finally(() => {
    refs.spinner.classList.add('is-hidden');
  });
}
export { apiSearchData, popularMovie };