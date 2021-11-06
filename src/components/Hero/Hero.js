import NavTab from '../NavTab/NavTab.js';
import Section from '../Section/Section'
import './Hero.css';


export default function MainHeader() {
  return (
    <Section className="hero">
      <h1 className="hero__header">
        Учебный проект студента факультета Веб-разработки
      </h1>
      <NavTab />
    </Section>
  );
}
