import './Navigation.css';
import { NavLink } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import accountIcon from '../../images/account_icon.svg';
import CurrentUser from '../../context/CurrentUserContext';

export default function Navigation({ hasInnerNav }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const isLoggedIn = !!useContext(CurrentUser).name;

  const handleHamburgerClick = () => setMenuIsOpen(!menuIsOpen);

  return (
    <nav
      className={`navigation ${
        menuIsOpen && isLoggedIn ? 'navigation_show' : ''
      }`}
    >
      <ul className="navigation__container">
        {hasInnerNav && isLoggedIn && (
          <li className="navigation__element navigation__element_centered">
            <nav className="inner-navigation">
              <NavLink
                exact
                to="/"
                className="navigation__link navigation__link_illusional"
                activeClassName="navigation__link_active"
                onClick={() => setMenuIsOpen(false)}
              >
                <button type="button" className="navigation__button">Главная</button>
              </NavLink>
              <NavLink
                to="/movies"
                className="navigation__link"
                activeClassName="navigation__link_active"
                onClick={() => setMenuIsOpen(false)}
              >
                <button type="button" className="navigation__button">Фильмы</button>
              </NavLink>
              <NavLink
                to="/saved-movies"
                className="navigation__link"
                activeClassName="navigation__link_active"
                onClick={() => setMenuIsOpen(false)}
              >
                <button type="button" className="navigation__button">
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
              <button type="button" className="navigation__button navigation__button_account">
                Аккаунт
              </button>
              <img
                alt="Иконка кнопки перехода в аккаунт"
                className="navigation__account_icon"
                src={accountIcon}
              />
            </NavLink>
          ) : (
            <>
              <NavLink to="/signup">
                <button type="button" className="navigation__button">Регистрация</button>
              </NavLink>
              <NavLink to="/signin">
                <button type="button" className="navigation__button navigation__button_sign-in">
                  Войти
                </button>
              </NavLink>
            </>
          )}
        </li>
        {isLoggedIn && (
          <li className="navigation__element navigation__element_toggler">
            <div
              role="button"
              className={`header__hamburger ${
                menuIsOpen ? 'header__hamburger_active' : ''
              }`}
              onClick={handleHamburgerClick}
            >
              <span className="header__hamburger-bar" />
              <span className="header__hamburger-bar" />
              <span className="header__hamburger-bar" />
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}
