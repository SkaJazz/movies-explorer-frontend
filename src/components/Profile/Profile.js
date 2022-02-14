import "./Profile.css";
import Section from '../Section/Section';
import { useContext, useState } from 'react';
import { CurrentUser } from '../../context/CurrentUserContext';

export default function Profile({ handleLogout, handleUpdateUser }) {
  const [userName, setUserName] = useState(useContext(CurrentUser).name);
  const [userEmail, setUserEmail] = useState(useContext(CurrentUser).email);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log({ name: userName, email: userEmail });
    handleUpdateUser({ name: userName, email: userEmail });
  };

  return (
    <Section className="profile">
      <h1 className="profile__header">
        Привет, {useContext(CurrentUser).name}!
      </h1>
      <form action="post" onSubmit={onFormSubmit} className="profile__form">
        <button className="profile__form-submit-button" type="submit">
          Submit
        </button>
        <label className="profile__form-line">
          Имя
          <input
            type="text"
            className="profile__form-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value.trim())}
          />
        </label>
        <label className="profile__form-line">
          Email
          <input
            type="text"
            className="profile__form-input"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value.trim())}
          />
        </label>
      </form>
      <ul className="profile__buttons">
        <li className="profile__button-container">
          <button className="profile__button" onClick={onFormSubmit}>
            Редактировать
          </button>
        </li>
        <li className="profile__button-container">
          <button
            className="profile__button profile__button_accent"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </li>
      </ul>
    </Section>
  );
};
