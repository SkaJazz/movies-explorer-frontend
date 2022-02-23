import React, { useContext, useState, useEffect } from 'react';
import useFormWithValidation from '../FormValidator/FormValidator';
import './Profile.css';
import Section from '../Section/Section';

import CurrentUser from '../../context/CurrentUserContext';

export default function Profile({ handleLogout, handleUpdateUser }) {
  const {
    handleChange, setValues, values, isValid
  } = useFormWithValidation();
  const currentUser = useContext(CurrentUser);

  const [notification, setNotification] = useState(false);

  useEffect(() => {
    setValues({
      userName: currentUser.name,
      userEmail: currentUser.email
    });
  }, []);

  const onFormSubmit = () => {
    setNotification(false);
    if (isValid) {
      handleUpdateUser({ name: values.userName, email: values.userEmail });
      setNotification(true);
      setTimeout(() => {
        setNotification('');
      }, 1400);
    }
  };

  return (
    <Section className="profile">
      <div className="profile__header-container">
        <h1 className="profile__header">
          {`Привет, ${currentUser.name}!`}
        </h1>
        <p
          className={`profile__header-notification ${
            notification ? 'profile__header-notification_shown' : ''
          }`}
        >
          Данные изменены!
        </p>
      </div>

      <form action="post" onSubmit={onFormSubmit} className="profile__form">
        <button
          className="profile__form-submit-button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
        <label className="profile__form-line">
          Имя
          <input
            required
            minLength={5}
            maxLength={30}
            name="userName"
            type="text"
            className="profile__form-input"
            value={values.userName || ''}
            onChange={e => handleChange(e)}
          />
        </label>
        <label className="profile__form-line">
          Email
          <input
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            required
            name="userEmail"
            type="text"
            className="profile__form-input"
            value={values.userEmail || ''}
            onChange={e => handleChange(e)}
          />
        </label>
      </form>
      <ul className="profile__buttons">
        <li className="profile__button-container">
          <button
            type="submit"
            className="profile__button"
            onClick={onFormSubmit}
            disabled={!isValid}
          >
            Редактировать
          </button>
        </li>
        <li className="profile__button-container">
          <button
            type="button"
            className="profile__button profile__button_accent"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </li>
      </ul>
    </Section>
  );
}
