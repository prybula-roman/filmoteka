

// refs.genreChoiseEl.addEventListener('click') => {
//     refs.genreChoiseEl.classList.toggle('.checked');
//     refs.yearChoiseEl.classList.remove('.checked');
//     refs.categoryGenreListEl.classList.toggle('.is-hidden');
//     refs.yearListEl.classList.add('.is-hidden');
// };


// refs.yearChoiseEl.addEventListener('click') => {
//     refs.yearChoiseEl.classList.toggle('checked');
//     refs.genreChoiseEl.classList.remove('checked');
//     refs.yearListEl.classList.toggle('is-hidden');
//     refs.categoryGenreListEl.classList.add('is-hidden');
// };

// refs.categoryGenreListEl.addEventListener('click', e) => {
//     e.path.forEach(el) => {
//         if (el.className === 'category-list__item') {
//             refs.genreChoiseEl.textContent = el.textContent;
//             refs.genreChoiseEl.dataset.id = el.dataset.id;
//             refs.categoryGenreListEl.classList.add('is-hidden');
//             refs.genreChoiseEl.classList.remove('checked');
//             refs.clearBtnEl.classList.remove('disable');//кнопка очистити [активна]
//         }
//     }
// }
    

// refs.yearListEl.addEventListener('click', e) => {
//     e.path.forEach(el) => {
//         if (el.className === 'year-list__item') {
//             refs.yearChoiseEl.textContent = el.textContent;
//             refs.yearChoiseEl.dataset.id = el.dataset.id;
//             refs.yearListEl.classList.add('is-hidden');
//             refs.yearChoiseEl.classList.remove('checked');
//             refs.clearBtnEl.classList.remove('disable');//кнопка очистити [активна]
//         }
//     }
// }

// refs.clearBtnEl.addEventListener('click', e) => {
//     e.preventDefault();
//     refs.genreChoiseEl.dataset.id = '';
//     refs.yearChoiseEL.dataset.id = '';
//     refs.yearListEl.classList.add('is-hidden');
//     refs.categoryGenreListEl.classList.add('is-hidden');
//     refs.genreChoiseEl.classList.remove('checked');
//     refs.yearChoiseEl.classList.remove('checked');
//     refs.clearBtnEl.classList.add('disable');//кнопка очистити [НЕ активна]
// }