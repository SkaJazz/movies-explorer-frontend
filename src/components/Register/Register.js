import React, { useState } from 'react';
import Section from '../Section/Section';
import SignForm from '../SignForm/SignForm';
import InputLine from '../InputLine/InputLine';

export default function Register({ handleRegister }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorObject, setErrorObject] = useState({
    nameErrMsg: 'Введите имя',
    emailErrMsg: 'Введите email',
    pwdErrMsg: 'Введите пароль',
  });

  const checkName = name => {
    setUserName(name);
    if (name.length < 3) {
      setErrorObject({
        ...errorObject,
        nameErrMsg: 'Имя должно быть длиннее двух символов',
      });
    } else if (name.length > 30) {
      setErrorObject({
        ...errorObject,
        nameErrMsg: 'Имя должно быть короче 30 символов',
      });
    } else if (!/^[а-яА-Яa-zA-Z -]+$/.test(name)) {
      setErrorObject({
        ...errorObject,
        nameErrMsg: 'Имя может содержать только буквы, пробел и дефис',
      });
    } else {
      setErrorObject({ ...errorObject, nameErrMsg: '' });
    }
  };

  const checkEmail = email => {
    setUserEmail(email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorObject({ ...errorObject, emailErrMsg: 'Введите email' });
    } else {
      setErrorObject({ ...errorObject, emailErrMsg: '' });
    }
  };

  const checkPwd = pwd => {
    setUserPassword(pwd);
    pwd.length < 2
      ? setErrorObject({ ...errorObject, pwdErrMsg: 'Введите пароль' })
      : setErrorObject({ ...errorObject, pwdErrMsg: '' });
  };

  return (
    <Section className="sign-section">
      <SignForm
        type="reg"
        submitHandler={() =>
          handleRegister({
            email: userEmail,
            name: userName,
            password: userPassword,
          })}
        hasErrors={
          errorObject.nameErrMsg
          || errorObject.emailErrMsg
          || errorObject.pwdErrMsg
        }
      >
        <InputLine
          label="Имя"
          inputName="name-input"
          type="text"
          onChange={e => checkName(e.target.value.trim())}
          value={userName}
          errorMessage={errorObject.nameErrMsg}
        />
        <InputLine
          label="E-mail"
          inputName="email-input"
          type="email"
          onChange={e => checkEmail(e.target.value.trim())}
          value={userEmail}
          errorMessage={errorObject.emailErrMsg}
        />
        <InputLine
          label="Пароль"
          inputName="password-input"
          type="password"
          onChange={e => checkPwd(e.target.value.trim())}
          value={userPassword}
          errorMessage={errorObject.pwdErrMsg}
        />
      </SignForm>
    </Section>
  );
}
