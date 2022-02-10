import "./Profile.css";
import Section from '../Section/Section';
import { useState } from 'react';

export default function Profile({user}) {
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(userName, userEmail);
  }

  return (
    <Section className="profile">
      <h1 className="profile__header">Привет, {user.name}!</h1>
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
          <button className="profile__button profile__button_accent">
            Выйти из аккаунта
          </button>
        </li>
      </ul>
    </Section>
  );
};
