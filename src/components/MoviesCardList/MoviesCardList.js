import "./MoviesCardList.css";
import Section from "../Section/Section";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";
import {
  QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_DESKTOP,
  QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_TABLETS,
  QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_MOBILE,
  QUANTITY_OF_TITLES_TO_BE_ADDED_ON_DESKTOP,
  QUANTITY_OF_TITLES_TO_BE_ADDED_ON_MOBILE,
  DESKTOP_TO_TABLET_BREAKPOINT,
  TABLET_TO_MOBILE_BREAKPOINT,
} from "../../utils/constants";

export default function MoviesCardList({
  type,
  films,
  isPending,
  handleSaveMovieClick,
  handleSaveMovie,
  errorMessage,
}) {
  const [cardsToShow, setCardsToShow] = useState(
    window.innerWidth > DESKTOP_TO_TABLET_BREAKPOINT
      ? QUANTITY_OF_TITLES_TO_BE_ADDED_ON_DESKTOP
      : QUANTITY_OF_TITLES_TO_BE_ADDED_ON_MOBILE
  );
  const [alreadyShown, setAlreadyShown] = useState([]);

  useEffect(() => {
    if (films.length > 0) {
      if (window.innerWidth > DESKTOP_TO_TABLET_BREAKPOINT) {
        setAlreadyShown(
          films.slice(0, QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_DESKTOP)
        );
      } else if (window.innerWidth < TABLET_TO_MOBILE_BREAKPOINT) {
        setAlreadyShown(
          films.slice(0, QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_MOBILE)
        );
      } else {
        setAlreadyShown(
          films.slice(0, QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_TABLETS)
        );
      }
    } else {
      setAlreadyShown([]);
    }
  }, [films]);

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setCardsToShow((cardsToShow) =>
          window.innerWidth > DESKTOP_TO_TABLET_BREAKPOINT
            ? QUANTITY_OF_TITLES_TO_BE_ADDED_ON_DESKTOP
            : QUANTITY_OF_TITLES_TO_BE_ADDED_ON_MOBILE
        );
      }, 300);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showMoreFilms = () => {
    if (films.length > alreadyShown.length) {
      setAlreadyShown(
        alreadyShown.concat(
          films.slice(alreadyShown.length, alreadyShown.length + cardsToShow)
        )
      );
    }
  };

  return (
    <Section className="movies-card-list__container">
      {isPending && <Preloader />}
      {!errorMessage && alreadyShown.length > 0 ? (
        <ul className="movies-card-list">
          {alreadyShown.map((film) => (
            <MoviesCard
              key={type === "savedMovies" ? film.movieId : film.id}
              movie={film}
              type={type}
              handleSaveMovieClick={handleSaveMovieClick}
              handleSaveMovie={handleSaveMovie}
            />
          ))}
        </ul>
      ) : (
        errorMessage && (
          <h3 className="movies-card-list__empty-message-header">
            {errorMessage}
          </h3>
        )
      )}
      {alreadyShown.length > 0 && films.length > alreadyShown.length && (
        <button
          onClick={showMoreFilms}
          className="movies-card-list__load-button"
        >
          Ещё
        </button>
      )}
    </Section>
  );
}
