import React, { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import getMoviesFromDb from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import sendRequestWithErrorHandler from '../../utils/errorHandler';

import { LONG_MOVIE_BREAKPOINT } from '../../utils/constants';

export default function Movies({
  storagedFilms,
  handleFilmsArray,
  syncFilmsArrayFromLocalStorage,
}) {
  const [filteredFilmList, setFilteredFilmList] = useState(JSON.parse(localStorage.getItem('filteredFilms')) || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  const requestFilms = async () => {
    setIsPending(true);
    const requestedFilms = await getMoviesFromDb();
    if (requestedFilms.error) {
      setErrorMessage(requestedFilms.error);
    }
    handleFilmsArray(requestedFilms);
    setIsPending(false);
    return requestedFilms;
  };

  const handleSearchSubmit = async ({ searchString, isShortsOnly }) => {
    setErrorMessage('');

    const filmArray = storagedFilms.length > 0 ? storagedFilms : await requestFilms();

    const trimmedSearchString = searchString.trim();

    const filteredOnlyShorts = films =>
      films.filter(film => film.duration < LONG_MOVIE_BREAKPOINT);

    if (trimmedSearchString) {
      const searchObject = {
        searchString,
        isShortsOnly,
      };

      localStorage.setItem('searchObject', JSON.stringify(searchObject));

      const filteredFilms = filmArray.filter(film =>
        film.nameRU.toLowerCase().includes(trimmedSearchString.toLowerCase()));
      if (filteredFilms.length < 1) {
        setErrorMessage('По вашему запросу ничего не найдено');
        localStorage.removeItem('filteredFilms');
      }
      const filteredFilmsToSave = isShortsOnly
        ? filteredOnlyShorts(filteredFilms)
        : filteredFilms;
      setFilteredFilmList(filteredFilmsToSave);
      localStorage.setItem(
        'filteredFilms',
        JSON.stringify(filteredFilmsToSave)
      );
    } else {
      setFilteredFilmList(
        isShortsOnly ? filteredOnlyShorts(filmArray) : filmArray
      );
    }
  };

  // SAVE MOVIE
  // !!! REWRITE TO UTILS PREPARE IMAGE

  const handleSaveMovie = movieData => {
    const movieDataToRequest = {
      country: movieData.country,
      director: movieData.director,
      duration: movieData.duration,
      year: movieData.year,
      description: movieData.description,
      image: `https://api.nomoreparties.co${movieData.image.url}`,
      trailer: movieData.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,
      movieId: movieData.id,
      nameRU: movieData.nameRU,
      nameEN: movieData.nameEN,
    };
    const token = JSON.parse(localStorage.getItem('token'));

    if (!movieData.isSaved) {
      sendRequestWithErrorHandler(
        mainApi
          .postMovie({
            movieDataToRequest,
            token,
          })
          .then(savedFilm => {
            const allMovies = JSON.parse(localStorage.getItem('films'));
            const allSavedMovies = localStorage.getItem('filteredFilms') && JSON.parse(localStorage.getItem('filteredFilms'));

            localStorage.setItem(
              'films',
              JSON.stringify(
                allMovies.map(movie =>
                  movie.id === savedFilm.movieId
                    ? { ...movie, isSaved: true, idToRemove: savedFilm._id }
                    : movie)
              )
            );

            allSavedMovies
              && localStorage.setItem(
                'filteredFilms',
                JSON.stringify(
                  allSavedMovies.map(movie =>
                    movie.id === savedFilm.movieId
                      ? { ...movie, isSaved: true, idToRemove: savedFilm._id }
                      : movie)
                )
              );

            setFilteredFilmList(
              filteredFilmList.map(movie =>
                movie.id === savedFilm.movieId
                  ? { ...movie, isSaved: true, idToRemove: savedFilm._id }
                  : movie)
            );

            syncFilmsArrayFromLocalStorage();
          })
      );
    } else {
      sendRequestWithErrorHandler(
        mainApi.removeMovie(token, movieData.idToRemove).then(removedFilm => {
          const allMovies = JSON.parse(localStorage.getItem('films'));
          const allSavedMovies = localStorage.getItem('filteredFilms')
            && JSON.parse(localStorage.getItem('filteredFilms'));

          allSavedMovies
            && localStorage.setItem(
              'filteredFilms',
              JSON.stringify(
                allSavedMovies.map(movie =>
                  movie.id === removedFilm.movieId
                    ? { ...movie, isSaved: false, idToRemove: null }
                    : movie)
              )
            );

          localStorage.setItem(
            'films',
            JSON.stringify(
              allMovies.map(movie =>
                movie.id === removedFilm.movieId
                  ? { ...movie, isSaved: false, idToRemove: null }
                  : movie)
            )
          );
          setFilteredFilmList(
            filteredFilmList.map(movie =>
              movie.id === removedFilm.movieId
                ? {
                  ...movie,
                  isSaved: false,
                  idToRemove: null,
                }
                : movie)
          );
          syncFilmsArrayFromLocalStorage();
        })
      );
    }
  };

  return (
    <>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        searchObject={localStorage.getItem('searchObject') && JSON.parse(localStorage.getItem('searchObject'))}
      />
      <MoviesCardList
        type="movies"
        films={filteredFilmList}
        errorMessage={errorMessage}
        handleSaveMovie={handleSaveMovie}
        isPending={isPending}
      />
    </>
  );
}
