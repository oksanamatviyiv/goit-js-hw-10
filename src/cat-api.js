import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
    'live_JTWhR9cZ6bfUdmBOUDkNKkE5YeWsZDoJqKInjO3z60xayayEcz1WJttOZc5WF8Zr';

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(imageUrlResponse => {
      return axios
        .get(`https://api.thecatapi.com/v1/breeds/${breedId}`)
        .then(breedDetailResponse => ({
          imageUrl: imageUrlResponse.data[0]?.url,
          breedDetails: breedDetailResponse.data,
        }));
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
      return { imageUrl: '', breedDetails: null };
    });
}

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
);
      return [];
    });
};




