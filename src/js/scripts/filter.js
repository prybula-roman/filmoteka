import { refs } from './refs';
import handleMovieCard from './handleMovieCard';
import filmCard from '../templates/preview_card.hbs';
import { onRenderPagination } from './pagination';
import { langs } from '../scripts/localization';

class MovieFilter {
    constructor() {
      this.BASE_URL = 'https://api.themoviedb.org/3'
      this.API_KEY = '208491dbcc6d03ee351feb599226bf58',
      this.page = 1;
    }
    async fetchMovies(genre, year, sort) {
      const url = `${this.BASE_URL}/discover/movie?with_genres=${genre}&sort_by=${sort}
&primary_release_year=${year}&api_key=${this.API_KEY}&page=${this._page}&language=${langs}`;
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

const movieFilter = new MovieFilter();

let sortValue = '';
let yearValue = '';
let genreValue = '';

document.querySelectorAll('.filter-input').forEach(item => {
  item.addEventListener('change', event => {
    movieFilter.resetPage();
    refs.formEl.value = '';
    sortValue = document.querySelector('#sortpicker').value;
    yearValue = document.querySelector('#yearpicker').value;
    genreValue = document.querySelector('#genrepicker').value;

    createCard(genreValue, yearValue, sortValue);

  });
});

function createCard(genre, year, sort) {
  movieFilter.fetchMovies(genre, year, sort).then(res => {
    refs.galleryEl.innerHTML = filmCard(handleMovieCard(res.results));   
    refs.paginationEl.innerHTML = ''    
    if(res.total_pages >= 500){
      res.total_pages = 500;
    }
    onRenderPagination(res.total_pages, res.page);
  })


}