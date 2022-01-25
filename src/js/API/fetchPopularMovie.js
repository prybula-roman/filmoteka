 import {langs } from '../scripts/localization';


export default class PopularMovies {
    constructor() {
        this.BASE_URL = 'https://api.themoviedb.org/3'
        this.API_KEY = '208491dbcc6d03ee351feb599226bf58',
        this.result,
        this.page = 1;
  }
 
    async fetchPopular() {
      const url = `${this.BASE_URL}/trending/movie/day?api_key=${this.API_KEY}&page=${this._page}&language=${langs}`;
      return await fetch(url)
      .then(res => {
        // this.incrementPage();
        return res.json();
      })
    }
    // incrementPage() {
    //     this.page += 1;
    // }
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