import FetchGenre from '../API/fetchGenre';

const apiGenreData = new FetchGenre();

export default function handleMovieCard(movies) {
  movies.forEach(elem => {
    if (elem.title.length > 30) {
      elem.title = elem.title.slice(0, 30) + '...';
    }

    if (elem.release_date) {
      elem.release_date = elem.release_date.slice(0, 4);
    } else {
      elem.release_date = 'Unknown';
    }
    //----------------------------------------------------
    if (typeof elem.genre_ids === 'string') {
      let bufArr = elem.genre_ids.split(',');
      console.log('bufArr=', bufArr);
      elem.genre_ids = bufArr;
      console.log("elem.genre_ids=",elem.genre_ids)
    }
    console.log("elem.genre_ids.length=",elem.genre_ids.length)
    // console.log('typeof elem.genre_ids=', typeof elem.genre_ids);
    //----------------------------------------------------
    if (elem.genre_ids.length > 0 && elem.genre_ids.length < 3) {
      elem.genre_ids = apiGenreData.ganreTranspiler(elem.genre_ids).slice(0, 2).join(', ');
    } else if (elem.genre_ids.length > 2) {
      elem.genre_ids =
        apiGenreData.ganreTranspiler(elem.genre_ids).slice(0, 2).join(', ') + ', ' + 'Other';
    } else {
      elem.genre_ids = 'Unknown';
    }
    //---------------------------------------------------
    if (elem.vote_average === 0) {
      elem.vote_average = 'Unknown';
    }

    if (elem.poster_path) {
      elem.poster_path = 'https://image.tmdb.org/t/p/w500' + elem.poster_path;
    } else {
      elem.poster_path =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsairhVA5q080vP7Niigy3bMCnGZNdzNCN4w&usqp=CAU';
    }
  });

  return movies;
}
