import logo from '../../images/logo.svg';
import './Header.css';
import { Link, useLocation } from "react-router-dom";
import { COMPONENTS_WITH_HEADER_NAV } from "../../utils/constants";

import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  let { pathname } = useLocation();
  

  return pathname === "/404" ? null : (
    <header className="header">
      <Link to="/">
        <img alt="Логотип сайта" className="logo" src={logo} />
      </Link>

      <Navigation hasInnerNav={COMPONENTS_WITH_HEADER_NAV.includes(pathname)} />
    </header>
  );
}
