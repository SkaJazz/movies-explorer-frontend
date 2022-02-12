import './MoviesCardList.css';
import Section from "../Section/Section";
import MoviesCard from "../MoviesCard/MoviesCard";
// import Preloader from '../Preloader/Preloader';

export default function MoviesCardList({films}) {

  return (
    <Section className="movies-card-list__container">
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
