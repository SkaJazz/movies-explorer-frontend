import "./MoviesCard.css";

export default function MoviesCard({
  movie: { nameRU, duration, saved = false, image },
}) {
  const formatDuration = (min) =>
    min < 60 ? `${min}м` : `${Math.floor(min / 60)}ч ${min % 60}м`;

  return (
    <li className="card__container">
      <div
        className="card__image-container"
        style={{ backgroundImage: `url(https://api.nomoreparties.co${image.url})` }}
      >
        <button
          className={`card__button card__button_${saved ? "unsave" : "save"}`}
        ></button>
      </div>
      <div className="card__meta-container">
        <h2 className="card__title">{nameRU || "Без названия"}</h2>
        <p className="card__duration">{formatDuration(duration)}</p>
      </div>
    </li>
  );
}
