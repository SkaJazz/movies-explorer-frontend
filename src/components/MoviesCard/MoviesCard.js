import "./MoviesCard.css";
import ok_icon from "../../images/ok_icon.svg";
import remove_icon from "../../images/remove_icon.svg";
import { useState } from "react";

export default function MoviesCard({
  movie: { nameRU, duration, saved = true, image },
  type,
}) {
  const [isSaved, setIsSaved] = useState(saved);

  const formatDuration = (min) =>
    min <= 60 ? `${min}м` : `${Math.floor(min / 60)}ч ${min % 60}м`;

  const renderButton = (isSaved) => (
    <button
      onClick={() => setIsSaved(!isSaved)}
      className={`card__button card__button_${
        isSaved ? (type === "savedMovies" ? "drop-from-saved" : "drop") : "save"
      }`}
    >
      {isSaved ? (
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
