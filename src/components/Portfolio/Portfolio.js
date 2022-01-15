import './Portfolio.css';
import Section from "../Section/Section";
import {
  Link
} from "react-router-dom";

export default function Portfolio() {
  return (
    <Section className="portfolio">
      <h2 className="porfolio__header">Портфолио</h2>
      <nav className="portfolio__nav">
        <ul className="portfolio__links">
          <li className="portfolio__item">
            <a
              href="https://github.com/SkaJazz/how-to-learn"
              className="portfolio__link"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://mesto-express.nomoredomains.work/"
              className="portfolio__link"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <Link to="/movies" className="portfolio__link">
              Одностраничное приложение
            </Link>
          </li>
        </ul>
      </nav>
    </Section>
  );
};




