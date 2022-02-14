import "./MoviesCardList.css";
import Section from "../Section/Section";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useEffect } from "react/cjs/react.development";
import { useState } from "react";

export default function MoviesCardList({ type, films, isPending = false, errorMessage }) {
  const [cardsToShow, setCardsToShow] = useState(window.innerWidth > 1199 ? 3 : 2);
  const [alreadyShown, setAlreadyShown] = useState([]);

  useEffect(() => {
    if (films.length > 0) {
      if (window.innerWidth > 1199) {
        setAlreadyShown(films.slice(0, 12));
      } else if (window.innerWidth < 768) {
        setAlreadyShown(films.slice(0, 5));
      } else {
        setAlreadyShown(films.slice(0, 8));
      }
    } 
  }, [films])

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setCardsToShow((cardsToShow) => (window.innerWidth > 1199 ? 3 : 2 ));
      }, 300);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showMoreFilms = () => {
    console.log(cardsToShow);
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
            <MoviesCard key={film.id} movie={film} type={type} />
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
