import logo from '../../images/logo.svg';
import styles from './Header.module.css';

export default function Header(props) {
  console.log(window.location.pathname);
  return (
    <header className={styles.header}>
      <img alt="Логотип сайта" className="logo" src={logo} />
      <nav className={styles.loginNav}>
        <button className={styles.button}>Регистрация</button>
        <button className={styles.primaryButton}>Войти</button>
      </nav>
    </header>
  );
}
