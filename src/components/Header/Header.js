import logo from '../../images/logo.svg';
import './Header.css';
import { Link, useLocation } from "react-router-dom";
import { COMPONENTS_WITH_HEADER_NAV } from "../../utils/constants";
import { COMPONENTS_WITHOUT_HEADER } from "../../utils/constants";

import Navigation from '../Navigation/Navigation';

export default function Header({isLoggedIn}) {
  let { pathname } = useLocation();
  

  return COMPONENTS_WITHOUT_HEADER.includes(pathname) ? null : (
    <header className="header">
      <Link to="/">
        <img alt="Логотип сайта" className="logo" src={logo} />
      </Link>

      <Navigation hasInnerNav={COMPONENTS_WITH_HEADER_NAV.includes(pathname)} isLoggedIn={isLoggedIn} />
    </header>
  );
}
