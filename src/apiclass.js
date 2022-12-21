import Notiflix from 'notiflix';
import axios from 'axios';

const API_KEY = '32133259-eb605dfa2d96a82515a2bf160';
const URL = `https://pixabay.com/api/`;


export default class ApiSearch {
constructor(){
    this.searchQuery = '';
    this.page = 1;
}
fetchImage () {
     return axios.get(`${URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
        const total = response.data.totalHits;
        const sum = response.data.hits.length;

          if (sum === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
         }   else {
             Notiflix.Notify.success(`Hooray! We found ${total} images.`);
        };

        this.updatePage()
        return response.data.hits
     })
}

updatePage(){
this.page += 1;
}
resetPage(){
    this.page = 1;
}

get query() {
    return this.searchQuery
}

set query(newQuery) {
    this.searchQuery = newQuery;
}

 };