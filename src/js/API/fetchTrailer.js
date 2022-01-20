import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css';

const API_KEY = '208491dbcc6d03ee351feb599226bf58';
const BASE_URL = 'https://api.themoviedb.org/3';

function onPlayTrailer(btn) {
  const trailerBtn = btn;
  trailerBtn.forEach(element =>
    element.addEventListener('click', event => {
      modalForTrailer(event.target.dataset.id);
    }),
  );

  function modalForTrailer(id) {
    const url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US}}`;
     fetch(url)
      .then(response => response.json())
      .then(data => {
        const id = data.results[0].key;
        const trailer = basicLightbox.create(`
          <iframe src='https://www.youtube.com/embed/${id}' 
            class="trailer"
            frameborder="0" 
            allow="accelerometer; 
            autoplay; 
            encrypted-media;
            gyroscope; 
            picture-in-picture" 
            allowfullscreen>
          </iframe>
      `);
      trailer.show();
      closeTrailer(trailer);
      })
      .catch(() => {
        const trailer = basicLightbox.create(`
          <iframe src='http://www.youtube.com/embed/zwBpUdZ0lrQ' 
          class="trailer"
          frameborder="0" 
          allow="accelerometer; 
          autoplay; 
          encrypted-media;
          gyroscope; 
          picture-in-picture" 
          allowfullscreen>
        </iframe>
      `); 

      trailer.show();
      closeTrailer(trailer);
      });
  }
  function closeTrailer(trailer) {
    const modalBox = document.querySelector('.basicLightbox--iframe');
    modalBox.insertAdjacentHTML(
      'afterbegin',
      `<button
        type="button"
        class="lightbox__button"
        data-action="close-lightbox"
        style='display: none'
        ></button>
    `,
    );
    const modalCloseBtn = document.querySelector(
      '[data-action="close-lightbox"]',
    );
    modalCloseBtn.addEventListener('click', () => trailer.close());
  }
}

export default { onPlayTrailer };