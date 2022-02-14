import logo from "../../images/logo.svg";
import "./SignForm.css";
import { Link } from "react-router-dom";

export default function SignForm({ type, children, submitHandler }) {
  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler();
  }

  return (
    <div className="reg-form">
      <header className="reg-form__header">
        <Link to="/">
          <img alt="Логотип сайта" className="logo" src={logo} />
        </Link>
      </header>
      <h1 className="reg-form__main-header">
        {type === "reg" ? "Добро пожаловать!" : "Рады видеть!"}
      </h1>
      <form onSubmit={onSubmit} className="reg-form__form">
        {children}

        <button className="reg-form__submit-button" type="submit">
          {type === "reg" ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>
      <p className="reg-form__subtext">
        {type === "reg" ? "Уже зарегистрированы?" : "Ещё не зарегистрированы?"}
        <Link
          to={type === "reg" ? "/signin" : "/signup"}
          className="reg-form__sublink"
        >
          {type === "reg" ? "Войти" : "Регистрация"}
        </Link>
      </p>
    </div>
  );
}
