import './AboutProject.css';

export default function AboutProject(props) {
  return (
    <section className="about">
      <h2 class="about__header">О проекте</h2>
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
    </section>
  );
};
