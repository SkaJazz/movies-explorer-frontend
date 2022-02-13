import { MOVIE_API_URL } from './constants';

export default function getMoviesFromDb() {
  return fetch(MOVIE_API_URL, {
    method: "GET"
  }).then(res => res.ok ? res.json() : Promise.reject({error: res.status}))
};
