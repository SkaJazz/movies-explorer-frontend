import './NavTab.css'

export default function NavTab(props) {
  return (
    <nav className="nav">
      <ul className="nav-items">
        <li>
          <a href="#" className="nav-item">
            О проекте
          </a>
        </li>
        <li>
          <a href="#" className="nav-item">
            Технологии
          </a>
        </li>
        <li>
          <a href="#" className="nav-item">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}
