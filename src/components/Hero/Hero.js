import NavTab from '../NavTab/NavTab.js';
import './Hero.css';


export default function MainHeader() {
  return (
    <section className="hero">
      <h1 className="hero__header">
        Учебный проект студента факультета Веб-разработки
      </h1>
      <NavTab />
    </section>
  );
}
