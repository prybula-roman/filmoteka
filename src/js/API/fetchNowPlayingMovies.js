import { langs } from '../scripts/localization';

export default class FetchNowPlayingMovies {

    constructor() {
        this.BASE_URL = 'https://api.themoviedb.org/3'
        this.API_KEY = '208491dbcc6d03ee351feb599226bf58',
        this.searchQuery = '';
        this.page = 1;
    
    }
    async fetchNowPlaying() {
        const url = `${this.BASE_URL}/movie/upcoming?api_key=${this.API_KEY}&query=${this.searchQuery}&language=${langs}&page=${this.page}`;
        return await fetch(url)
        .then(res => {
            this.incrementPage();
          // //console.log(res.json())
            return res.json();
        })
    }
    incrementPage() {
        this.page += 1;
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

};