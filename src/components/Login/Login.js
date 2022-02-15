import Section from "../Section/Section";
import { useState } from "react";
import SignForm from "../SignForm/SignForm";
import InputLine from "../InputLine/InputLine";

export default function Login({handleLogin}) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorObject, setErrorObject] = useState({
    emailErrMsg: "Введите email",
    pwdErrMsg: "Введите пароль",
  });

    const checkEmail = (email) => {
      setUserEmail(email);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorObject({ ...errorObject, emailErrMsg: "Введите email" });
      } else {
        setErrorObject({ ...errorObject, emailErrMsg: "" });
      }
    };

    const checkPwd = (pwd) => {
      setUserPassword(pwd);
      pwd.length < 2
        ? setErrorObject({ ...errorObject, pwdErrMsg: "Введите пароль" })
        : setErrorObject({ ...errorObject, pwdErrMsg: "" });
    };

  return (
    <Section className="sign-section">
      <SignForm
        type="login"
        submitHandler={() =>
          handleLogin({
            email: userEmail,
            password: userPassword,
          })
        }
        hasErrors={
          errorObject.nameErrMsg ||
          errorObject.emailErrMsg ||
          errorObject.pwdErrMsg
        }
      >
        <InputLine
          label="E-mail"
          inputName="email-input"
          type="email"
          onChange={(e) => checkEmail(e.target.value.trim())}
          value={userEmail}
          errorMessage={errorObject.emailErrMsg}
        />
        <InputLine
          label="Пароль"
          inputName="password-input"
          type="password"
          onChange={(e) => checkPwd(e.target.value.trim())}
          value={userPassword}
          errorMessage={errorObject.pwdErrMsg}
        />
      </SignForm>
    </Section>
  );
}