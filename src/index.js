import axios from 'axios';
import { fetchCatByBreed } from './cat-api.js';
import { fetchBreeds } from './cat-api.js';
import SlimSelect from 'slim-select';
new SlimSelect({
  select: `#breed-select`,
});
import Notiflix from 'notiflix';

const fetchBreedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function populateBreedSelect() {
  
  showLoader();
  
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        fetchBreedSelect.appendChild(option);
      });
      hideLoader();
    })
    .catch(error => {
      Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}
fetchBreedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
    showLoader(breedId);
  fetchCatByBreed(breedId)
    .then(({ imageUrl, breedDetails }) => {
      if (breedDetails) {
        catInfoDiv.innerHTML = `
          <h2>${breedDetails.name}</h2>
          <p>${breedDetails.description}</p>
          <p>${breedDetails.temperament}</p>
          <img src="${imageUrl}" alt="${breedDetails.name}" width="580px" />
        `;
      }
      hideLoader(); 
      Notiflix.Notify.info(`Loading data, please wait...`);
    })
    .catch(error => {
      Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
});

populateBreedSelect();

function showLoader() {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfoDiv.innerHTML = '';
}

function hideLoader() {
  loader.style.display = 'none';
}



