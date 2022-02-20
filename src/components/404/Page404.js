import './Page404.css';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Page404() {
  const history = useHistory();

  return (
    <section className="notfound">
      <h1 className="notfound__header">404</h1>
      <p className="notfound__comment">Страница не найдена</p>
      <button type="button" className="notfound__button" onClick={() => history.goBack()}>
        Назад
      </button>
    </section>
  );
}
