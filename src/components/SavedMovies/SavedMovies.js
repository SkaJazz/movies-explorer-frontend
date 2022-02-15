import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import MainApi from "../../utils/MainApi";
import { useState, useEffect } from "react";

export default function SavedMovies({syncFilmsArrayFromLocalStorage}) {
  const [savedFilms, setSavedFilms] = useState([]);
  const [filteredFilmList, setFilteredFilmList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchFilms() {
      const token =
        localStorage.getItem("token") &&
        JSON.parse(localStorage.getItem("token"));
      const savedMovies = await MainApi.getMovies(token);
      savedMovies && setSavedFilms(
        savedMovies.movies.map((film) => ({ ...film, isSaved: true }))
      );
    }

    fetchFilms();
  }, []);

  // TO UTILS!!!!!
  const handleSaveMovieClick = async (movie) => {
    if (movie.isSaved) {
      const token =
        localStorage.getItem("token") &&
        JSON.parse(localStorage.getItem("token"));
      const removedMovie = await MainApi.removeMovie(token, movie._id);
      if (removedMovie) {
        setSavedFilms(savedFilms.filter((film) => film.movieId !== removedMovie.movieId));
        setFilteredFilmList(
          filteredFilmList.filter((film) => film.movieId !== removedMovie.movieId)
        );
        const allMovies = JSON.parse(localStorage.getItem("films"));
        console.log("allMovies: ", allMovies);
        localStorage.setItem(
          "films",
          JSON.stringify(
            allMovies.map((movie) =>
              movie.id === removedMovie.movieId
                ? { ...movie, isSaved: false }
                : movie
            )
          )
        );
        syncFilmsArrayFromLocalStorage();
      }
    }
  }

  const handleSearchSubmit = ({ searchString, isShortsOnly }) => {
    setErrorMessage("");
    const trimmedSearchString = searchString.trim();

    const filteredOnlyShorts = (films) =>
      films.filter((film) => film.duration < 41);

    if (trimmedSearchString) {
      const filteredFilms = savedFilms.filter((film) =>
        film.nameRU.toLowerCase().includes(trimmedSearchString.toLowerCase())
      );

      filteredFilms.length === 0 &&
        setErrorMessage("По вашему запросу ничего не найдено");

      if (isShortsOnly) {
        const filteredShorts = filteredOnlyShorts(filteredFilms);
        filteredShorts.length > 0
          ? setFilteredFilmList(filteredShorts)
          : setErrorMessage("По вашему запросу ничего не найдено");
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
