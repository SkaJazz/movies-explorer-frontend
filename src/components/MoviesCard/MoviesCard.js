import './MoviesCard.css';

export default function MoviesCard({movie}) {
  return (
    <li className="card__container">
      {/* <img src={card.image || "no"} alt="" /> */}
      <div className="card__image-container">
        <button
          className={`card__button card__button_${movie.saved ? "unsave" : "save"}`}
        ></button>
      </div>
      <div className="card__meta-container">
        <h2 className="card__title">{movie.title}</h2>
        <p className="card__duration">1ч 12м</p>
      </div>
    </li>
  );
};
