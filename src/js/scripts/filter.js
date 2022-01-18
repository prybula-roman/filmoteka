import { refs } from './refs';
import handleMovieCard from './handleMovieCard';
import filmCard from '../templates/preview_card.hbs';
import { onRenderPagination } from './pagination'

class MovieGenreFilter {
    constructor() {
      this.BASE_URL = 'https://api.themoviedb.org/3'
      this.API_KEY = '208491dbcc6d03ee351feb599226bf58',
      this.page = 1;
      this.genre = '';
    }
    async fetchMovies(genre) {
      const url = `${this.BASE_URL}/discover/movie?${this.genre}&api_key=${this.API_KEY}&page=${this._page}&language=en-US`;
      return await fetch(url)
          .then(response => (response.ok ? response.json() : []))
          .catch(error => console.log(error));
    }
    
    incrementPage() {
      this._page += 1;
    }
    decrementPage() {
      this._page -= 1;
    }
    resetPage() {
      this._page = 1;
    }
    get page() {
      return this._page;
    }
    set page(value) {
      this._page = value;
    }
  }


const moviesFilter = new MovieGenreFilter();


let sortValue = '';

document.querySelectorAll('.genre-input').forEach(item => {
  item.addEventListener('change', event => {
    moviesFilter.resetPage();
    refs.formEl.value = '';
    sortValue = document.querySelector('#sortpicker').value;
    createCard(sortValue);
  });
});

function createCard(genre) {
  moviesFilter.fetchMovies(genre).then(res => {
    refs.galleryEl.innerHTML = filmCard(handleMovieCard(res.results));   
    refs.paginationEl.innerHTML = ''    
    if(res.total_pages >= 500){
      res.total_pages = 500;
    }
    onRenderPagination(res.total_pages, res.page);
  })
}

   