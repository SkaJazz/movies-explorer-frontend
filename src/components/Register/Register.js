import React from 'react';
import Section from '../Section/Section';
import SignForm from '../SignForm/SignForm';
import InputLine from '../InputLine/InputLine';
import useFormWithValidation from '../FormValidator/FormValidator';

export default function Register({ handleRegister }) {
  // NEW
  const {
    handleChange, values, isValid, errors
  } = useFormWithValidation();

  return (
    <Section className="sign-section">
      <SignForm
        type="reg"
        submitHandler={() =>
          handleRegister({
            email: values.userEmail,
            name: values.userName,
            password: values.userPassword,
          })}
        hasErrors={!isValid}
      >
        <InputLine
          required
          minLength={5}
          maxLength={30}
          pattern="[а-яА-Яa-zA-Z -]+"
          label="Имя"
          name="userName"
          inputName="name-input"
          type="text"
          onChange={e => handleChange(e)}
          value={values.userName}
          errorMessage={errors.userName}
        />
        <InputLine
          required
          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
          label="E-mail"
          inputName="email-input"
          name="userEmail"
          type="email"
          onChange={e => handleChange(e)}
          value={values.userEmail}
          errorMessage={errors.userEmail}
        />
        <InputLine
          required
          minLength={2}
          label="Пароль"
          inputName="password-input"
          name="userPassword"
          type="password"
          onChange={e => handleChange(e)}
          value={values.userPassword}
          errorMessage={errors.userPassword}
        />
      </SignForm>
    </Section>
  );
}
