import React from 'react';
import './Footer.css';
import { useLocation } from 'react-router-dom';
import { COMPONENTS_WITH_NO_FOOTER } from '../../utils/constants';

export default function Footer() {
  const renderYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear > 2021 ? `2021\u00A0— ${currentYear}` : '2021';
  };
  const { pathname } = useLocation();
  const hideFooter = () => COMPONENTS_WITH_NO_FOOTER.includes(pathname);

  return (
    hideFooter() || (
    <footer className="footer">
      <div className="footer__info">
        <p className="footer__info-text">
          Учебный проект Яндекс.Практикум x BeatFilm
        </p>
        <div className="footer__info-line">
          <p className="footer__info-copy">
            &copy;
            {renderYear()}
          </p>
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
    )
  );
}
