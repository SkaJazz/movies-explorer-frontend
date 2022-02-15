import "./MoviesCard.css";
import ok_icon from "../../images/ok_icon.svg";
import remove_icon from "../../images/remove_icon.svg";


export default function MoviesCard({ movie, handleSaveMovieClick, handleSaveMovie, type }) {

  const formatDuration = (min) =>
    min <= 60 ? `${min}м` : `${Math.floor(min / 60)}ч ${min % 60}м`;

  const handleMovieButtonClick = () => {
    type !== "savedMovies" ? handleSaveMovie(movie) :  handleSaveMovieClick(movie);
  }

  const renderButton = () => (
    <button
      onClick={handleMovieButtonClick}
      className={`card__button card__button_${
        movie.isSaved
          ? type === "savedMovies"
            ? "drop-from-saved"
            : "drop"
          : "save"
      }`}
    >
      {movie.isSaved ? (
        type === "savedMovies" ? (
          <img alt="Иконка удаления" src={remove_icon} />
        ) : (
          <img alt="Иконка подтверждения" src={ok_icon} />
        )
      ) : (
        "Сохранить"
      )}
    </button>
  );

  return (
    <li className="card__container">
      <div className="card__image-container">
        <img
          src={
            type === "savedMovies"
              ? movie.image
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          alt={`Постер к фильму ${movie.nameRU}`}
          className="card__image"
        />
        {renderButton()}
      </div>
      <div className="card__meta-container">
        <h2 className="card__title">{movie.nameRU || "Без названия"}</h2>
        <p className="card__duration">{formatDuration(movie.duration)}</p>
      </div>
    </li>
  );
}
