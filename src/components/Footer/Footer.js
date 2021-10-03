export default function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer__info">
        <p className="footer__info-text">
          Учебный проект Яндекс.Практикум x BeatFilm
        </p>
        <div className="footer__info-line">
          <p className="footer__info-copy"></p>
          <nav className="footer__nav">
            <ul>
              <li className="footer__nav-item">
                <a href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
                <a href="https://github.com/SkaJazz">Github</a>
                <a href="https://www.facebook.com/mikhail.malyarov">Facebook</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
