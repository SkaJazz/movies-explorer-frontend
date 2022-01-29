import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import movies from "../../vendor/mock_movies.json";
import { useState } from "react";

export default function Movies() {
  const filmList = movies.slice(0, 100);
  const [filteredFilmList, setFilteredFilmList] = useState(filmList);
  console.log(filteredFilmList);

  const handleSearchSubmit = ({ searchString }) => {
    const trimmedSearchString = searchString.trim();
    if (trimmedSearchString) {
      const filteredFilms = filmList.filter((film) =>
        film.nameRU.toLowerCase().includes(trimmedSearchString.toLowerCase())
      );
      setFilteredFilmList(filteredFilms);
    } else {
      setFilteredFilmList(filmList);
    }
  };

  return (
    <>
      <SearchForm handleSearchSubmit={handleSearchSubmit} />
      <MoviesCardList films={filteredFilmList} />
    </>
  );
}
