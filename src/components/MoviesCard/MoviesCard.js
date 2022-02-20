import React from 'react';
import './MoviesCard.css';
import okIcon from '../../images/ok_icon.svg';
import removeIcon from '../../images/remove_icon.svg';

export default function MoviesCard({
  movie, handleSaveMovieClick, handleSaveMovie, type
}) {
  const formatDuration = min =>
    min <= 60 ? `${min}м` : `${Math.floor(min / 60)}ч ${min % 60}м`;

  const handleMovieButtonClick = () => {
    type !== 'savedMovies' ? handleSaveMovie(movie) : handleSaveMovieClick(movie);
  };

  const renderButton = () => (
    <button
      type="button"
      onClick={handleMovieButtonClick}
      className={`card__button card__button_${
        movie.isSaved
          ? type === 'savedMovies'
            ? 'drop-from-saved'
            : 'drop'
          : 'save'
      }`}
    >
      {movie.isSaved ? (
        type === 'savedMovies' ? (
          <img alt="Иконка удаления" src={removeIcon} />
        ) : (
          <img alt="Иконка подтверждения" src={okIcon} />
        )
      ) : (
        'Сохранить'
      )}
    </button>
  );

  return (
    <li className="card__container">
      <div className="card__image-container">
        <img
          src={
            type === 'savedMovies'
              ? movie.image
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          alt={`Постер к фильму ${movie.nameRU}`}
          className="card__image"
          onClick={() => window.open(type === 'savedMovies' ? movie.trailer : movie.trailerLink, '_blank')}
        />
        {renderButton()}
      </div>
      <div className="card__meta-container">
        <h2 className="card__title">{movie.nameRU || 'Без названия'}</h2>
        <p className="card__duration">{formatDuration(movie.duration)}</p>
      </div>
    </li>
  );
}
