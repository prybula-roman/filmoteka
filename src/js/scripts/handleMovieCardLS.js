//import FetchGenre from '../API/fetchGenre';

import { langs } from './localization';
import {refs} from "./refs"

//const apiGenreData = new FetchGenre();
export default function handleMovieCardLS(movies) {
    movies.forEach(film => {
    if (film.title.length > 30) {
        film.title = film.title.slice(0, 30) + '...';
    }
    
    if (film.release_date){
        (film.release_date = film.release_date.slice(0, 4))
    } else{
        (film.release_date = 'Unknown');
    }
    
    if (film.vote_average === 0) {
        film.vote_average = 'Unknown'
    }

    // let genresName = [];
    // if (film.genre_ids.length > 0) {
    //   film.genre_ids.forEach(genre => {
    //     genresName.push(genre.name);
    //     film.genre_ids = genresName.slice(0, 2).join(", ");
    //   })
    // }
    // if (refs.GLOBAL_IS_QUE || refs.GLOBAL_IS_LIB) {
    //        let bufArr = film.genre_ids.split(',');
    //        //console.log('bufArr=', (bufArr));
    //        film.genre_ids = bufArr;
    //        //console.log("film.genre_ids=",film.genre_ids)
    //      }


    if (film.poster_path) {
        film.poster_path =  film.poster_path;
      } else {
        film.poster_path =
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsairhVA5q080vP7Niigy3bMCnGZNdzNCN4w&usqp=CAU';
      }
  })
    return movies;
  }