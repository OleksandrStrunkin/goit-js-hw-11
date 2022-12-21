import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiSearch from './apiclass';

const refs = {
    inputForm: document.querySelector('.search-form input'),
    searchBtn: document.querySelector('.search-form'),
    loadmoreBtn: document.querySelector('.load-more'),
    boxContent: document.querySelector('.gallery'),
};

let items = [];

const apiSearch = new ApiSearch();

refs.searchBtn.addEventListener('submit', searchBtn);
refs.loadmoreBtn.addEventListener('click', searchMore)
 


function searchBtn(e) {
  e.preventDefault();
  clearBox();
  apiSearch.query = refs.inputForm.value;
  if (refs.inputForm.value === '') {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } else {
     apiSearch.resetPage();
  apiSearch.fetchImage().then(imageMarkup);
  }


  
}

function searchMore() {
  apiSearch.fetchImage().then(imageMarkup);
}

const getItemTemplate = ({webformatURL, tags, likes, views, comments, downloads, largeImageURL}) => `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width=300px/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views </b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`


function imageMarkup(hits) {
  items = hits;
  const list = items.map(getItemTemplate);

  refs.boxContent.insertAdjacentHTML('beforeend', list.join(''));
  let lightbox = new SimpleLightbox('.gallery a', {
            captionsData: `alt`,
            captionDelay: 250,
        });
}

function clearBox() {
  refs.boxContent.innerHTML = '';
}