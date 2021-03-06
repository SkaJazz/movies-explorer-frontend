import React, { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import MainApi from '../../utils/MainApi';

import { LONG_MOVIE_BREAKPOINT } from '../../utils/constants';

export default function SavedMovies({ syncFilmsArrayFromLocalStorage }) {
  const [savedFilms, setSavedFilms] = useState([]);
  const [filteredFilmList, setFilteredFilmList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchFilms() {
      const token = localStorage.getItem('token')
        && JSON.parse(localStorage.getItem('token'));
      const savedMovies = await MainApi.getMovies(token);
      console.log(savedMovies);

      const filteredSavedFilms = savedMovies && savedMovies.movies.map(film => ({
        ...film,
        isSaved: true,
      }));
      setSavedFilms(filteredSavedFilms);
      setFilteredFilmList(filteredSavedFilms);
    }

    fetchFilms();
  }, []);

  // TO UTILS!!!!!
  const handleSaveMovieClick = async movie => {
    if (movie.isSaved) {
      const token = localStorage.getItem('token')
        && JSON.parse(localStorage.getItem('token'));
      const removedMovie = await MainApi.removeMovie(token, movie._id);
      if (removedMovie) {
        setSavedFilms(savedFilms.filter(film => film.movieId !== removedMovie.movieId));
        setFilteredFilmList(
          filteredFilmList.filter(film => film.movieId !== removedMovie.movieId)
        );
        const allMovies = JSON.parse(localStorage.getItem('films'));
        const allSavedMovies = localStorage.getItem('filteredFilms')
          && JSON.parse(localStorage.getItem('filteredFilms'));

        localStorage.setItem(
          'films',
          JSON.stringify(
            allMovies.map(movieExemplar =>
              movieExemplar.id === removedMovie.movieId
                ? { ...movieExemplar, isSaved: false }
                : movieExemplar)
          )
        );

        allSavedMovies
          && localStorage.setItem(
            'filteredFilms',
            JSON.stringify(
              allSavedMovies.map(movieExemplar =>
                movieExemplar.id === removedMovie.movieId
                  ? { ...movieExemplar, isSaved: false, idToRemove: null }
                  : movieExemplar)
            )
          );
        syncFilmsArrayFromLocalStorage();
      }
    }
  };

  const handleSearchSubmit = ({ searchString, isShortsOnly }) => {
    setErrorMessage('');
    const trimmedSearchString = searchString.trim();

    const filteredOnlyShorts = films =>
      films.filter(film => film.duration < LONG_MOVIE_BREAKPOINT);

    if (trimmedSearchString) {
      const filteredFilms = savedFilms.filter(film =>
        film.nameRU.toLowerCase().includes(trimmedSearchString.toLowerCase()));

      filteredFilms.length === 0
        && setErrorMessage('???? ???????????? ?????????????? ???????????? ???? ??????????????');

      if (isShortsOnly) {
        const filteredShorts = filteredOnlyShorts(filteredFilms);
        filteredShorts.length > 0
          ? setFilteredFilmList(filteredShorts)
          : setErrorMessage('???? ???????????? ?????????????? ???????????? ???? ??????????????');
      } else {
        setFilteredFilmList(filteredFilms);
      }
    }
  };

  return (
    <>
      <SearchForm handleSearchSubmit={handleSearchSubmit} />
      <MoviesCardList
        type="savedMovies"
        films={filteredFilmList}
        errorMessage={errorMessage}
        handleSaveMovieClick={handleSaveMovieClick}
      />
    </>
  );
}
