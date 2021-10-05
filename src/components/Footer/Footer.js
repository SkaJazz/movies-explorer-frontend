import './Footer.css';

export default function Footer(props) {
  const renderYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear > 2021 ? `2021 — ${currentYear}` : `2021`;
  }

  return (
    <footer className="footer">
      <div className="footer__info">
        <p className="footer__info-text">
          Учебный проект Яндекс.Практикум x BeatFilm
        </p>
        <div className="footer__info-line">
          <p className="footer__info-copy">&copy; {renderYear()}</p>
          <nav className="footer__nav">
            <ul className="footer__nav-items">
              <li>
                <a
                  className="footer__nav-item"
                  href="https://practicum.yandex.ru/"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li>
                <a
                  className="footer__nav-item"
                  href="https://github.com/SkaJazz"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  className="footer__nav-item"
                  href="https://www.facebook.com/mikhail.malyarov"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
