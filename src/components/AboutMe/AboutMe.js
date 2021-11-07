import Section from "../Section/Section";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <Section className="bio__container">
      <ComponentHeader title="Студент" />
      <div className="bio">
        <div className="bio__text-container">
          <h3 className="bio__name">Михаил</h3>
          <p className="bio__lead">Фронтенд-разработчик, 32 года</p>
          <p className="bio__summary">
            Родился и живу в Санкт-Петербурге. Магистр права Высшей Школы
            Экономики. Работаю менеджером по продукту, играю в ЧГК, вместе с
            женой воспитываем маленькую дочь. Писать фронтенд я начал тогда,
            когда это ещё не называлось фронтендом - мой первый сайт был
            страшной мешаниной из jQuery-скриптов. Потом я учился разработке
            самостоятельно, а год назад поступил на курс Практикума. Эта
            страничка - моя выпускная работа.
          </p>
          <ul className="bio__links">
            <li className="bio__link-element">
              <a
                className="bio__link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/mikhail.malyarov"
              >
                Facebook
              </a>
            </li>
            <li className="bio__link-element">
              <a
                className="bio__link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/SkaJazz"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          className="bio__image"
          src="/me.jpeg"
          alt="Фотография студента Яндекс.Практикума Михаила Малярова"
        />
      </div>
    </Section>
  );
}
