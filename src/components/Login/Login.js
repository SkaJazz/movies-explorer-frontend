import Section from "../Section/Section";
import { useState } from "react";
import SignForm from "../SignForm/SignForm";
import InputLine from "../InputLine/InputLine";
import { useHistory } from 'react-router-dom';

export default function Login({handleLogin}) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorObject, setErrorObject] = useState({
    nameErrMsg: "",
    emailErrMsg: "",
    pwdErrMsg: "",
  });

  return (
    <Section className="sign-section">
      <SignForm
        type="login"
        submitHandler={() => handleLogin({
          email: userEmail,
          password: userPassword,
        })}
      >
        <InputLine
          label="E-mail"
          inputName="email-input"
          type="email"
          onChange={(e) => setUserEmail(e.target.value.trim())}
          onFocus={() => setErrorObject({ ...errorObject, emailErrMsg: "" })}
          value={userEmail}
          errorMessage={errorObject.emailErrMsg}
        />
        <InputLine
          label="Пароль"
          inputName="password-input"
          type="password"
          onChange={(e) => setUserPassword(e.target.value.trim())}
          onFocus={() => setErrorObject({ ...errorObject, pwdErrMsg: "" })}
          value={userPassword}
          errorMessage={errorObject.pwdErrMsg}
        />
      </SignForm>
    </Section>
  );
}