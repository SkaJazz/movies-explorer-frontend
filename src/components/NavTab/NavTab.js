import "./NavTab.css";

export default function NavTab(props) {
  const handlerClick = (e) => {
    props.clickHandler(e.target.attributes.to.value);
  };

  return (
    <nav className="nav">
      <ul className="nav-items">
        <li>
          <button onClick={handlerClick} to="aboutRef" className="nav-item">
            О проекте
          </button>
        </li>
        <li>
          <button onClick={handlerClick} to="techsRef" className="nav-item">
            Технологии
          </button>
        </li>
        <li>
          <button onClick={handlerClick} to="aboutMeRef" className="nav-item">
            Студент
          </button>
        </li>
      </ul>
    </nav>
  );
}
