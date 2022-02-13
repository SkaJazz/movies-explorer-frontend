import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import getMoviesFromDb from "../../utils/MoviesApi";

import { useState } from "react";

export default function Movies({ storagedFilms, handleFilmsArray }) {

  const [filteredFilmList, setFilteredFilmList] = useState("");
  const [errorOnRequest, setErrorOnRequest] = useState("");

  const requestFilms = async () => {
    console.log("Отправляем запрос...");
    const requestedFilms = await getMoviesFromDb();
    if (requestedFilms.error) {
      setErrorOnRequest(requestedFilms.error);
    }
    handleFilmsArray(requestedFilms);
    return requestedFilms;
  };

  const handleSearchSubmit = async ({ searchString, isShortsOnly }) => {
    const filmArray = storagedFilms.length > 0 ? storagedFilms : await requestFilms();

    const trimmedSearchString = searchString.trim();

    const filteredOnlyShorts = (films) =>
      films.filter((film) => film.duration < 41);

    if (trimmedSearchString) {
      const filteredFilms = filmArray.filter((film) =>
        film.nameRU.toLowerCase().includes(trimmedSearchString.toLowerCase())
      );
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
      <MoviesCardList films={filteredFilmList} />
    </>
  );
}
