import "./SearchForm.css";
import search_icon from "../../images/search_icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

export default function SearchForm({ handleSearchSubmit }) {
  const [searchString, setSearchString] = useState("");
  const [isShortsOnly, setIsShortsOnly] = useState(false);

  const handleSearchStringChange = (e) => setSearchString(e.target.value);
  const toggleIsShortsOnly = () => setIsShortsOnly(!isShortsOnly);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log({ searchString, isShortsOnly });
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
            src={search_icon}
          />
        </label>
        <input
          type="text"
          placeholder="Фильм"
          autoсomplete="off"
          value={searchString || ""}
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
