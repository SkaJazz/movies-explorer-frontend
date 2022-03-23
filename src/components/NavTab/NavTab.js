import React from 'react';
import './NavTab.css';

export default function NavTab({ clickHandler }) {
  const handlerClick = e => {
    clickHandler(e.target.attributes.to.value);
  };

  return (
    <nav className="nav">
      <ul className="nav-items">
        <li>
          <button type="button" onClick={handlerClick} to="aboutRef" className="nav-item">
            О проекте
          </button>
        </li>
        <li>
          <button type="button" onClick={handlerClick} to="techsRef" className="nav-item">
            Технологии
          </button>
        </li>
        <li>
          <button type="button" onClick={handlerClick} to="aboutMeRef" className="nav-item">
            Студент
          </button>
        </li>
      </ul>
    </nav>
  );
}
