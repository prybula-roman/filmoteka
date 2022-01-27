import FetchGenre from '../API/fetchGenre';
import { refs } from './refs';


const apiGenreData = new FetchGenre();

function handleModalMovieCardLS(film) {
console.log(film)
//   if (film.genre_ids.length === 1) {
//     film.genre_ids = apiGenreData
//     .ganreTranspiler(film.genre_ids)
//   }

//   if (film.genre_ids.length  > 1) {
//     film.genre_ids = apiGenreData
//     .ganreTranspiler(film.genre_ids)
//     .join(', ');
//   }
if (film.poster_path) {
    film.poster_path =  film.poster_path;
  } else {
    film.poster_path =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsairhVA5q080vP7Niigy3bMCnGZNdzNCN4w&usqp=CAU';
  }

  return film;
}
export {handleModalMovieCardLS};