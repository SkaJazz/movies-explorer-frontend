import "./Navigation.css";
import account_icon from "../../images/account_icon.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navigation({ hasInnerNav, isLoggedIn = true }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleHamburgerClick = () => setMenuIsOpen(!menuIsOpen);

  return (
    <nav
      className={`navigation ${
        menuIsOpen && isLoggedIn ? "navigation_show" : ""
      }`}
    >
      <ul className="navigation__container">
        {hasInnerNav && (
          <li className="navigation__element navigation__element_centered">
            <nav className="inner-navigation">
              <NavLink
                exact
                to="/"
                className="navigation__link navigation__link_illusional"
                activeClassName="navigation__link_active"
                onClick={() => setMenuIsOpen(false)}
              >
                <button className="navigation__button">Главная</button>
              </NavLink>
              <NavLink
                to="/movies"
                className="navigation__link"
                activeClassName="navigation__link_active"
                onClick={() => setMenuIsOpen(false)}
              >
                <button className="navigation__button">Фильмы</button>
              </NavLink>
              <NavLink
                to="/saved-movies"
                className="navigation__link"
                activeClassName="navigation__link_active"
                onClick={() => setMenuIsOpen(false)}
              >
                <button className="navigation__button">
                  Сохраненные фильмы
                </button>
              </NavLink>
            </nav>
          </li>
        )}
        <li className="navigation__element navigation__element_sign">
          {isLoggedIn ? (
            <NavLink
              to="/profile"
              className="navigation__account-container"
              onClick={() => setMenuIsOpen(false)}
            >
              <button className="navigation__button navigation__button_account">
                Аккаунт
              </button>
              <img
                alt="Иконка кнопки перехода в аккаунт"
                className="navigation__account_icon"
                src={account_icon}
              />
            </NavLink>
          ) : (
            <>
              <NavLink to="/signup">
                <button className="navigation__button">Регистрация</button>
              </NavLink>
              <NavLink to="/signin">
                <button className="navigation__button navigation__button_sign-in">
                  Войти
                </button>
              </NavLink>
            </>
          )}
        </li>
        {isLoggedIn && (
          <li className="navigation__element navigation__element_toggler">
            <div
              className={`header__hamburger ${
                menuIsOpen ? "header__hamburger_active" : ""
              }`}
              onClick={handleHamburgerClick}
            >
              <span className="header__hamburger-bar"></span>
              <span className="header__hamburger-bar"></span>
              <span className="header__hamburger-bar"></span>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}
