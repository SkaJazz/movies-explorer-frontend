import React from 'react';
import Section from '../Section/Section';
import SignForm from '../SignForm/SignForm';
import InputLine from '../InputLine/InputLine';
import useFormWithValidation from '../FormValidator/FormValidator';

export default function Login({ handleLogin }) {
  const {
    handleChange, values, isValid, errors
  } = useFormWithValidation();

  return (
    <Section className="sign-section">
      <SignForm
        type="login"
        submitHandler={() =>
          handleLogin({
            email: values.userEmail,
            password: values.userPassword,
          })}
        hasErrors={!isValid}
      >
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
