import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
    'live_JTWhR9cZ6bfUdmBOUDkNKkE5YeWsZDoJqKInjO3z60xayayEcz1WJttOZc5WF8Zr';

export async function fetchCatByBreed(breedId) {
  try {
    const imageUrlResponse = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const breedDetailResponse = await axios.get(
      `https://api.thecatapi.com/v1/breeds/${breedId}`
    );

    return {
      imageUrl: imageUrlResponse.data[0]?.url,
      breedDetails: breedDetailResponse.data,
    };
  } catch (error) {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
    return { imageUrl: '', breedDetails: null };
  }
}