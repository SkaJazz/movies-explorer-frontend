import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import movies from "../../vendor/mock_movies.json";
import { useState } from "react";

export default function Movies() {
  const filmList = movies.slice(0, 15);
  const [filteredFilmList, setFilteredFilmList] = useState(filmList);

  const handleSearchSubmit = ({ searchString, isShortsOnly }) => {
    const trimmedSearchString = searchString.trim();

    const filteredOnlyShorts = (films) =>
      films.filter((film) => film.duration < 41);

    if (trimmedSearchString) {
      const filteredFilms = filmList.filter((film) =>
        film.nameRU.toLowerCase().includes(trimmedSearchString.toLowerCase())
      );
      setFilteredFilmList(
        isShortsOnly ? filteredOnlyShorts(filteredFilms) : filteredFilms
      );
    } else {
      setFilteredFilmList(
        isShortsOnly ? filteredOnlyShorts(filmList) : filmList
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
