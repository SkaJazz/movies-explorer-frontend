import search_icon from "../../images/search_icon.svg";
import { useState } from "react";

export default function SearchForm({ handleSearchSubmit }) {
  const [searchString, setSearchString] = useState("");

  const handleSearchStringChange = (e) => setSearchString(e.target.value);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(searchString);
    handleSearchSubmit({
      searchString
    });
  };

  return (
    <form action="post" className="search-form" onSubmit={onFormSubmit}>
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
    </form>
  );
}
