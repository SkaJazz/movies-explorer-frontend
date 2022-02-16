import "./Profile.css";
import Section from '../Section/Section';
import { useContext, useState } from 'react';
import { CurrentUser } from '../../context/CurrentUserContext';

export default function Profile({ handleLogout, handleUpdateUser }) {
  const [currentName, setCurrentName] = useState(useContext(CurrentUser).name);
  const [currentMail, setCurrentMail] = useState(useContext(CurrentUser).email);
  const [userName, setUserName] = useState(currentName);
  const [userEmail, setUserEmail] = useState(currentMail);
    const [errorObject, setErrorObject] = useState({
      emailErrMsg: "",
      nameErrMsg: "",
    });

  const onFormSubmit = (e) => {
    if (!errorObject.nameErrMsg || !errorObject.emailErrMsg) {
      handleUpdateUser({ name: userName, email: userEmail });
      setCurrentName(userName);
      setCurrentMail(userEmail);
    }
  };

  const checkEmail = (email) => {
    setUserEmail(email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorObject({ ...errorObject, emailErrMsg: "Введите email" });
    } else {
      setErrorObject({ ...errorObject, emailErrMsg: "" });
    }
  };

  const checkName = (name) => {
    setUserName(name);
    if (name.length < 3) {
      setErrorObject({
        ...errorObject,
        nameErrMsg: "Имя должно быть длиннее двух символов",
      });
    } else if (name.length > 30) {
      setErrorObject({
        ...errorObject,
        nameErrMsg: "Имя должно быть короче 30 символов",
      });
    } else if (!/^[а-яА-Яa-zA-Z -]+$/.test(name)) {
      setErrorObject({
        ...errorObject,
        nameErrMsg: "Имя может содержать только буквы, пробел и дефис",
      });
    } else {
      setErrorObject({ ...errorObject, nameErrMsg: "" });
    }
  };

  return (
    <Section className="profile">
      <h1 className="profile__header">
        Привет, {useContext(CurrentUser).name}!
      </h1>
      <form action="post" onSubmit={onFormSubmit} className="profile__form">
        <button
          className="profile__form-submit-button"
          type="submit"
          disabled={
            errorObject.nameErrMsg ||
            errorObject.emailErrMsg ||
            (userName === currentName && userEmail === currentMail)
          }
        >
          Submit
        </button>
        <label className="profile__form-line">
          Имя
          <input
            type="text"
            className="profile__form-input"
            value={userName}
            onChange={(e) => checkName(e.target.value.trim())}
          />
        </label>
        <label className="profile__form-line">
          Email
          <input
            type="text"
            className="profile__form-input"
            value={userEmail}
            onChange={(e) => checkEmail(e.target.value.trim())}
          />
        </label>
      </form>
      <ul className="profile__buttons">
        <li className="profile__button-container">
          <button
            className="profile__button"
            onClick={onFormSubmit}
            disabled={
              errorObject.nameErrMsg || errorObject.emailErrMsg ||
              (userName === currentName && userEmail === currentMail)
            }
          >
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
