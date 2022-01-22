
const getMoviesData = async function (promise) {
  let array = [];
  const filmArr = [];
  await promise
    .then((data) => {
      array = [...data.results];
      let str = "";
      array.forEach((e) => {
        str = "";
        let arr = [];
        str = arr.join(', ');
        obj.genre_ids = str;
        obj.release_date = e.release_date.split('-')[0];
        filmArr.push(obj);
      });
    })
    .catch(er => console.log(er) );
  return filmArr;
};

export default getMoviesData;