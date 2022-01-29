import search_icon from "../../images/logo.svg";

export default function SearchForm(params) {
  return (
    <form action="post" className="search-form">
      <label htmlFor="search-form__film-input" className="search-form__label">
        {search_icon}
      </label>
      <input type="text" className="search-form__film-input" />
    </form>
  );
}
