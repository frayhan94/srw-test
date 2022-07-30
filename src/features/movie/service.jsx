import axios from 'axios';
import { transformObjToQuery } from '../../utils/helpers';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = '7f753478c8faa75bdd0b9b33b3521125';

const getGenres = async () => {
  const queryGender = transformObjToQuery({ api_key: API_KEY });
  const urlGenre = `${BASE_URL}/genre/movie/list${queryGender}`;
  const responseGenre = await axios.get(urlGenre);
  return responseGenre?.data?.genres || [];
};

const getMovies = async () => {
  const takeFirstGenres = await getGenres();
  const takeGenresName = takeFirstGenres.map((valueGenres) => valueGenres.name);
  const takeAllMovies = takeFirstGenres.map(async (value) => {
    const queryMovie = transformObjToQuery({ with_genres: value.id, api_key: API_KEY });
    const urlMovie = `${BASE_URL}/discover/movie${queryMovie}`;
    const response = await axios.get(urlMovie);
    return response.data;
  });

  const waitAllMovies = await Promise.all(takeAllMovies);
  return {
    genre: takeGenresName,
    movie: waitAllMovies,
  };
};

const service = {
  getMovies,
  getGenres,
};

export default service;
