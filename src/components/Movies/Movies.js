import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import getMoviesFromDb from "../../utils/MoviesApi";

import { useState } from "react";

export default function Movies({ storagedFilms, handleFilmsArray }) {

  const [filteredFilmList, setFilteredFilmList] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const requestFilms = async () => {
    const requestedFilms = await getMoviesFromDb();
    if (requestedFilms.error) {
      setErrorMessage(requestedFilms.error);
    }
    handleFilmsArray(requestedFilms);
    return requestedFilms;
  };

  const handleSearchSubmit = async ({ searchString, isShortsOnly }) => {
    setErrorMessage("");

    const filmArray = storagedFilms.length > 0 ? storagedFilms : await requestFilms();

    const trimmedSearchString = searchString.trim();

    const filteredOnlyShorts = (films) =>
      films.filter((film) => film.duration < 41);

    if (trimmedSearchString) {
      const filteredFilms = filmArray.filter((film) =>
        film.nameRU.toLowerCase().includes(trimmedSearchString.toLowerCase())
      );

      if (filteredFilms.length < 1) {
        setErrorMessage("По вашему запросу ничего не найдено")
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

  return (
    <>
      <SearchForm handleSearchSubmit={handleSearchSubmit} />
      <MoviesCardList
        type="movies"
        films={filteredFilmList}
        errorMessage={errorMessage}
      />
    </>
  );
}
