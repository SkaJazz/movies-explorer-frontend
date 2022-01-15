import NavTab from '../NavTab/NavTab.js';
import Section from '../Section/Section'
import './Hero.css';


export default function MainHeader(props) {
  return (
    <Section className="hero">
      <h1 className="hero__header">
        Учебный проект студента факультета Веб-разработки
      </h1>
      <NavTab clickHandler={props.clickHandler} />
    </Section>
  );
}
