import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'f4fc9e0b9d39be2e572ef6e62fdd383f';

const fetchTrending = () => {
  return axios
    .get(
      `/trending/movie/day?api_key=${API_KEY}`,
    )
    .then(response => response.data.results);
};

const fetchMovie = (query) => {
  return axios
    .get(
      `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
    )
    .then(response => response.data);
};

const fetchMovieById = (movieId) => {
  return axios
    .get(
      `/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    )
    .then(response => response.data);
};

const fetchCast = (movieId) => {
  return axios
    .get(
      `/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    )
    .then(response => response.data.cast);
};
const fetchReview = (movieId) => {
  return axios
    .get(
      `/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
    )
    .then(response => response.data.results);
};

export default { fetchTrending, fetchMovie, fetchMovieById, fetchCast, fetchReview };
