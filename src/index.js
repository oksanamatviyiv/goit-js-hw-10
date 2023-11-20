import axios from 'axios';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
new SlimSelect({
  select: `breed-select`,
});
import Notiflix from 'notiflix';

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  }
}
const fetchBreedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

async function populateBreedSelect() {
  try {
    showLoader();
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      fetchBreedSelect.appendChild(option);
    });
    hideLoader();
  } catch (error) {
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`)
  }
}

fetchBreedSelect.addEventListener('change', async event => {
  const breedId = event.target.value;
  try {
    showLoader();
    const { imageUrl, breedDetails } = await fetchCatByBreed(breedId);

    if (breedDetails) {
      catInfoDiv.innerHTML = `
        <h2>${breedDetails.name}</h2>
        <p>${breedDetails.description}</p>
        <p>${breedDetails.temperament}</p>
        <img src="${imageUrl}" alt="${breedDetails.name}" />
      `;
    }
    hideLoader(error);
     Notiflix.Notify.info(`Loading data, please wait...`)
  } catch (error) {
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`)
  }
});

function showLoader() {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfoDiv.innerHTML = '';
}

function hideLoader() {
  loader.style.display = 'none';
}

populateBreedSelect();
