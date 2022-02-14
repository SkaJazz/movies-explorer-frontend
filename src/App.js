import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Page404 from "./components/404/Page404";
import MainContainer from "./components/MainContainer/MainContainer";
import AboutProject from "./components/AboutProject/AboutProject";
import Techs from "./components/Techs/Techs";
import AboutMe from "./components/AboutMe/AboutMe";
import Hero from "./components/Hero/Hero";
import Movies from "./components/Movies/Movies";
import SavedMovies from "./components/SavedMovies/SavedMovies";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { CurrentUser } from "./context/CurrentUserContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useRef, useState } from "react";

function App() {
  // const history = useHistory();

  // get films array from local storage on App mounting
  const [filmsArray] = useState(
    (localStorage.films && JSON.parse(localStorage.films)) || []
  );

  const [currentUser, setCurrentUser] = useState({
    name: "Миша",
    email: "m@malyarov.com",
  });

  const handleFilmsArray = (films) => {
    localStorage.setItem("films", JSON.stringify(films));
  };
  const refs = {
    aboutRef: useRef(null),
    techsRef: useRef(null),
    aboutMeRef: useRef(null),
  };

  const scrollToItem = (refElement) =>
    refs[refElement].current.scrollIntoView({ behavior: "smooth" });

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser({ name: null, email: null });
  };

  return (
    <CurrentUser.Provider value={currentUser}>
      <Router>
        <div className="app">
          <Header />
          <MainContainer>
            <Switch>
              <Route exact path="/">
                <Hero clickHandler={scrollToItem} />
                <AboutProject refProp={refs.aboutRef} />
                <Techs refProp={refs.techsRef} />
                <AboutMe refProp={refs.aboutMeRef} />
              </Route>
              <ProtectedRoute isLoggedIn={currentUser.name} path="/movies">
                <Movies
                  storagedFilms={filmsArray}
                  handleFilmsArray={handleFilmsArray}
                />
              </ProtectedRoute>
              <ProtectedRoute
                isLoggedIn={currentUser.name}
                path="/saved-movies"
              >
                <SavedMovies />
              </ProtectedRoute>
              <ProtectedRoute isLoggedIn={currentUser.name} path="/profile">
                <Profile handleLogout={handleLogout} />
              </ProtectedRoute>
              <Route path="/signin">
                <Login />
              </Route>
              <Route path="/signup">
                <Register />
              </Route>
              <Route path="/404">
                <Page404 />
              </Route>
              <Route path="*">
                <Redirect to="/404" />
              </Route>
            </Switch>
          </MainContainer>
          <Footer />
        </div>
      </Router>
    </CurrentUser.Provider>
  );
}

export default App;
