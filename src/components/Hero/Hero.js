import './Hero.css';

export default function MainHeader() {
  return (
    <section className="hero">
      <h1 className="hero__header">
        Учебный проект студента факультета Веб-разработки
      </h1>
      <nav className="hero__nav">
        <ul className="hero__nav-items">
          <li>
            <a href="#" className="hero__nav-item">
              О проекте
            </a>
          </li>
          <li>
            <a href="#" className="hero__nav-item">
              Технологии
            </a>
          </li>
          <li>
            <a href="#" className="hero__nav-item">
              Студент
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
