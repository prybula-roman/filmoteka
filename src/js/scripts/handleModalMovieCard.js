import FetchGenre from '../API/fetchGenre';

const apiGenreData = new FetchGenre();

function handleModalMovieCard(film) {
 
//----------------------------------------------------
console.log("typeof film.genre_ids=",typeof film.genre_ids);
console.log("film.genre_ids.length=",film.genre_ids.length);
if (typeof film.genre_ids === 'string') {
  let bufArr = film.genre_ids.split(',');
  console.log('bufArr=', (bufArr));
  film.genre_ids = bufArr;
  console.log("elem.genre_ids=",film.genre_ids)
}
console.log("elem.genre_ids.length=",film.genre_ids.length)
// console.log('typeof elem.genre_ids=', typeof elem.genre_ids);
//----------------------------------------------------

  if (film.genre_ids.length = 1) {
    film.genre_ids = apiGenreData
    .ganreTranspiler(film.genre_ids)
  }

  if (film.genre_ids.length  > 1) {
    film.genre_ids = apiGenreData
    .ganreTranspiler(film.genre_ids)
    .join(', ');
  }
  if (film.poster_path) {
    film.poster_path = 'https://image.tmdb.org/t/p/w500' + film.poster_path;
  }else{
    film.poster_path = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsairhVA5q080vP7Niigy3bMCnGZNdzNCN4w&usqp=CAU'
  }

  return film;
}
export {handleModalMovieCard};