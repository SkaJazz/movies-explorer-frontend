import './MoviesCardList.css';
import Section from "../Section/Section";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList() {
  return(
    <Section className="movies-card-list">
      <MoviesCard movie={{
        title: "weee",
        saved: true
      }}/>
    </Section>
  )
};
