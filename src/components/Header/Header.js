import logo from '../../images/logo.svg';
import styles from './Header.module.css';

import { useLocation } from 'react-router-dom';

export default function Header(props) {
  let { pathname } = useLocation();

  return pathname === '/404' ? null : (
    <header className={styles.header}>
      <img alt="Логотип сайта" className="logo" src={logo} />
      {<p>{pathname}</p>}
      <nav className={styles.loginNav}>
        <button className={styles.button}>Регистрация</button>
        <button className={styles.primaryButton}>Войти</button>
      </nav>
    </header>
  );
}
