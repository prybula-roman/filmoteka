import { refs } from './refs';
import handleMovieCard from './handleMovieCard';
import filmCard from '../templates/preview_card.hbs';
import { onRenderPagination } from './pagination'


class MovieYearFilter {
    constructor() {
      this.BASE_URL = 'https://api.themoviedb.org/3'
      this.API_KEY = '208491dbcc6d03ee351feb599226bf58',
      this.page = 1;
      this.year = 'primary_release_year';
    }
    async fetchMovies(year) {
      const url = `${this.BASE_URL}/discover/movie?${year}&api_key=${this.API_KEY}&page=${this._page}&language=en-US`;
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


const movieYearFilter = new MovieYearFilter();


let searchingYear = '';

document.querySelectorAll('.year-list__item').forEach(item => {
  item.addEventListener('click', event => {
    movieYearFilter.resetPage();
    refs.yearChoiseEl.classList.toggle('checked');
    // refs.genreChoiseEl.classList.remove('checked');
    refs.yearListEl.classList.toggle('is-hidden');
    // refs.categoryGenreListEl.classList.add('is-hidden');
    refs.yearChoiseEl.value = '';
    searchingYear = document.querySelector('.year-list__item').value;
    createCard(searchingYear);
  });
});

function createCard(year) {
  movieYearFilter.fetchMovies(year).then(res => {
    refs.galleryEl.innerHTML = filmCard(handleMovieCard(res.results));   
    refs.paginationEl.innerHTML = ''    
    if(res.total_pages >= 500){
      res.total_pages = 500;
    }
    onRenderPagination(res.total_pages, res.page);
  })
}

   