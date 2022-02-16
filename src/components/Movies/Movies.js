import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import getMoviesFromDb from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { sendRequestWithErrorHandler } from "../../utils/commonFunctions";

import { useState } from "react";

export default function Movies({
  storagedFilms,
  handleFilmsArray,
  syncFilmsArrayFromLocalStorage,
}) {
  const [filteredFilmList, setFilteredFilmList] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false)

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
    setErrorMessage("");
    const filmArray =
      storagedFilms.length > 0 ? storagedFilms : await requestFilms();

    const trimmedSearchString = searchString.trim();

    const filteredOnlyShorts = (films) =>
      films.filter((film) => film.duration < 41);

    if (trimmedSearchString) {
      const filteredFilms = filmArray.filter((film) =>
        film.nameRU.toLowerCase().includes(trimmedSearchString.toLowerCase())
      );
      if (filteredFilms.length < 1) {
        setErrorMessage("По вашему запросу ничего не найдено");
      }
      setFilteredFilmList(
        isShortsOnly ? filteredOnlyShorts(filteredFilms) : filteredFilms
      );
    } else {
      setFilteredFilmList(
        isShortsOnly ? filteredOnlyShorts(filmArray) : filmArray
      );
    }
  };

  // SAVE MOVIE
  // !!! REWRITE TO UTILS PREPARE IMAGE

  const handleSaveMovie = (movieData) => {
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
    const token = JSON.parse(localStorage.getItem("token"));

    if (!movieData.isSaved) {
      sendRequestWithErrorHandler(
        mainApi
          .postMovie({
            movieDataToRequest,
            token,
          })
          .then((savedFilm) => {
            const allMovies = JSON.parse(localStorage.getItem("films"));
            localStorage.setItem(
              "films",
              JSON.stringify(
                allMovies.map((movie) =>
                  movie.id === savedFilm.movieId
                    ? { ...movie, isSaved: true, idToRemove: savedFilm._id }
                    : movie
                )
              )
            );
            setFilteredFilmList(
              filteredFilmList.map((movie) =>
                movie.id === savedFilm.movieId
                  ? { ...movie, isSaved: true, idToRemove: savedFilm._id }
                  : movie
              )
            );
            syncFilmsArrayFromLocalStorage();
          })
      );
    } else {
      sendRequestWithErrorHandler(
        mainApi.removeMovie(token, movieData.idToRemove).then((removedFilm) => {
          const allMovies = JSON.parse(localStorage.getItem("films"));
          localStorage.setItem(
            "films",
            JSON.stringify(
              allMovies.map((movie) =>
                movie.id === removedFilm.movieId
                  ? { ...movie, isSaved: false, idToRemove: null }
                  : movie
              )
            )
          );
          setFilteredFilmList(
            filteredFilmList.map((movie) =>
              movie.id === removedFilm.movieId
                ? {
                    ...movie,
                    isSaved: false,
                    idToRemove: null,
                  }
                : movie
            )
          );
          syncFilmsArrayFromLocalStorage();
        })
      );
    }
  };

  return (
    <>
      <SearchForm handleSearchSubmit={handleSearchSubmit} />
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
