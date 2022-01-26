 import { langs } from '../scripts/localization';

export default class FetchSearchMovie {
  constructor() {
    this.BASE_URL = 'https://api.themoviedb.org/3';
    (this.API_KEY = '208491dbcc6d03ee351feb599226bf58'), (this.searchQuery = '');
    this.page = 1;
  }
  async fetchMovies() {
    const url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${this.searchQuery}&page=${this.page}&language=${langs}`;
    return await fetch(url).then(res => {
      return res.json();
    });
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery.trim();
  }

  set query(value) {
    this.searchQuery = value;
  }
}
