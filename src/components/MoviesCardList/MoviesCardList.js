import './MoviesCardList.css';
import Section from "../Section/Section";
import MoviesCard from "../MoviesCard/MoviesCard";
import movies from "../../vendor/mock_movies.json"

export default function MoviesCardList() {
  const films = movies.slice(0,100);
  console.log(films);
  return (
    <Section className="movies-card-list__container">
      <ul className="movies-card-list">
        {films.map((film) => (
          <MoviesCard key={film.id} movie={film} />
        ))}
      </ul>
    </Section>
  );
};
