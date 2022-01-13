export default class FetchGenre {
  constructor() {
    this.BASE_URL = 'https://api.themoviedb.org/3',
    this.API_KEY = '208491dbcc6d03ee351feb599226bf58'
    this.ganreObject = {};
    this.handleGenre();
  }

  async fetchGenre() {
    const response = await fetch(
      `${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}`,
    );
    return response.json();
  }

  async handleGenre() {
    this.ganreObject = await this.fetchGenre();
  }

  ganreTranspiler(arr) {
    const listGenresNames = [];
    arr.forEach(id =>
      this.ganreObject.genres
        .filter(genre => genre.id === id)
        .forEach(genre => listGenresNames.push(genre.name)),
    );
    return listGenresNames;
  }
} 