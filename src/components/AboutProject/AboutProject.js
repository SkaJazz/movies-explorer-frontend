import './AboutProject.css';
import Section from "../Section/Section";
import ComponentHeader from '../ComponentHeader/ComponentHeader';

export default function AboutProject(props) {
  return (
    <Section className="about">
      <ComponentHeader title="О проекте" />
      <ul className="about__cards">
        <li className="about__card">
          <h3 className="about__card-header">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__card-paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about__card">
          <h3 className="about__card-header">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__card-paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="timeline">
        <li className="timeline__element timeline__element--back">
          <p className="timeline__line timeline__line--back">1 неделя</p>
          <p className="timeline__label">Back-end</p>
        </li>
        <li className="timeline__element timeline__element--front">
          <p className="timeline__line">4 недели</p>
          <p className="timeline__label">Front-end</p>
        </li>
      </ul>
    </Section>
  );
};
