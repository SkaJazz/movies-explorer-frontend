import React from 'react';
import NavTab from '../NavTab/NavTab';
import Section from '../Section/Section';
import './Hero.css';

export default function MainHeader({ clickHandler }) {
  return (
    <Section className="hero">
      <h1 className="hero__header">
        Учебный проект студента факультета Веб-разработки
      </h1>
      <NavTab clickHandler={clickHandler} />
    </Section>
  );
}
