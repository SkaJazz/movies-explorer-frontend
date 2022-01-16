import "./MoviesCard.css";
import okIcon from "../../images/ok_icon.svg";
import { useState } from 'react';

export default function MoviesCard({
  movie: { nameRU, duration, saved = false, image },
}) {
  const [isSaved, setIsSaved] = useState(saved);
  console.log(isSaved)

  const formatDuration = (min) =>
    min <= 60 ? `${min}м` : `${Math.floor(min / 60)}ч ${min % 60}м`;

  const renderButton = (isSaved) => (
    <button
      onClick={() => setIsSaved(!isSaved)}
      className={`card__button card__button_${isSaved ? "drop" : "save"}`}
    >
      {isSaved ? <img alt="Иконка подтверждения" src={okIcon} /> : "Сохранить"}
    </button>
  );

  return (
    <li className="card__container">
      <div
        className="card__image-container"
        style={{
          backgroundImage: `url(https://api.nomoreparties.co${image.url})`,
        }}
      >
        {renderButton(isSaved)}
      </div>
      <div className="card__meta-container">
        <h2 className="card__title">{nameRU || "Без названия"}</h2>
        <p className="card__duration">{formatDuration(duration)}</p>
      </div>
    </li>
  );
}
