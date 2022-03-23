// Components helpers
const COMPONENTS_WITH_HEADER_NAV = ['/', '/movies', '/saved-movies', '/profile'];
const COMPONENTS_WITH_NO_FOOTER = ['/profile', '/signin', '/signup'];
const COMPONENTS_WITHOUT_HEADER = ['/404', '/signin', '/signup'];

const QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_DESKTOP = 12;
const QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_TABLETS = 8;
const QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_MOBILE = 5;

const QUANTITY_OF_TITLES_TO_BE_ADDED_ON_DESKTOP = 3;
const QUANTITY_OF_TITLES_TO_BE_ADDED_ON_MOBILE = 2;

const DESKTOP_TO_TABLET_BREAKPOINT = 1199;
const TABLET_TO_MOBILE_BREAKPOINT = 768;

const LONG_MOVIE_BREAKPOINT = 41;

// API helpers
const MOVIE_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export {
  QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_DESKTOP,
  QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_TABLETS,
  QUANTITY_OF_TITLES_TO_BE_SHOWN_ON_MOBILE,
  QUANTITY_OF_TITLES_TO_BE_ADDED_ON_DESKTOP,
  QUANTITY_OF_TITLES_TO_BE_ADDED_ON_MOBILE,
  DESKTOP_TO_TABLET_BREAKPOINT,
  TABLET_TO_MOBILE_BREAKPOINT,
  LONG_MOVIE_BREAKPOINT,
  COMPONENTS_WITH_HEADER_NAV,
  COMPONENTS_WITH_NO_FOOTER,
  COMPONENTS_WITHOUT_HEADER,
  MOVIE_API_URL
};
