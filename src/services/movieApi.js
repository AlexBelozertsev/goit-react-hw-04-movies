import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'f4fc9e0b9d39be2e572ef6e62fdd383f';

const fetchTrending = () => {
  return axios
    .get(
      `/trending/all/day?api_key=${API_KEY}`,
    )
    .then(response => response.data.results);
};

const fetchMovie = query => {
  return axios
    .get(
      `/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
    )
    .then(response => response.data);
};

const fetchMovieById = (type, movieId) => {
  return axios
    .get(
      `/${type}/${movieId}?api_key=${API_KEY}&language=en-US`,
    )
    .then(response => response.data);
};

const fetchCast = (type, movieId) => {
  return axios
    .get(
      `/${type}/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    )
    .then(response => response.data.cast);
};
const fetchReview = (type, movieId) => {
  return axios
    .get(
      `/${type}/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
    )
    .then(response => response.data.results);
};
const fetchPerson = person => {
  return axios
    .get(
      `/search/person?api_key=${API_KEY}&language=en-US&query=${person}&page=1&include_adult=true`
    )
    .then(response => response.data.results);
}

export default { fetchTrending, fetchMovie, fetchMovieById, fetchCast, fetchReview, fetchPerson };
