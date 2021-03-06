import './SearchForm.css';
import React, { useState } from 'react';
import searchIcon from '../../images/search_icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ handleSearchSubmit, searchObject }) {
  const [searchString, setSearchString] = useState(
    searchObject && searchObject.searchString
  );
  const [isShortsOnly, setIsShortsOnly] = useState(searchObject
    && searchObject.isShortsOnly);

  const handleSearchStringChange = e => setSearchString(e.target.value);
  const toggleIsShortsOnly = () => setIsShortsOnly(!isShortsOnly);

  const onFormSubmit = e => {
    e.preventDefault();
    handleSearchSubmit({
      searchString,
      isShortsOnly,
    });
  };

  return (
    <form action="post" className="search-form" onSubmit={onFormSubmit}>
      <div className="search-form__input-container">
        <label htmlFor="search-input" className="search-form__label">
          <img
            alt="Иконка поиска"
            className="search-form__film-input-logo"
            src={searchIcon}
          />
        </label>
        <input
          required
          type="text"
          placeholder="Фильм"
          autoсomplete="off"
          value={searchString || ''}
          onChange={handleSearchStringChange}
          name="search-input"
          id="search-input"
          className="search-form__film-input"
        />
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </div>
      <FilterCheckbox
        isShortsOnly={isShortsOnly}
        toggleIsShortsOnly={toggleIsShortsOnly}
      />
    </form>
  );
}
