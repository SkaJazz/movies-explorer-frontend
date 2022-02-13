import './MoviesCardList.css';
import Section from "../Section/Section";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react/cjs/react.development';
import { useState } from 'react';

export default function MoviesCardList({films, isPending = false}) {
  const [showRules, setShowRules] = useState({cardsToShow: 1});

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowRules((showRules) => ({
          ...showRules,
          cardsToShow: window.innerWidth > 1199 ? 3 : 2,
        }));
      }, 300);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Section className="movies-card-list__container">
      {isPending && <Preloader />}
      {films.length > 0 ? (
        <ul className="movies-card-list">
          {films.map((film) => (
            <MoviesCard key={film.id} movie={film} />
          ))}
        </ul>
      ) : (
        <h3 className="movies-card-list__empty-message-header">
          Мы не нашли фильмов по вашему запросу =((
        </h3>
      )}
      <button className="movies-card-list__load-button">Ещё</button>
    </Section>
  );
};
