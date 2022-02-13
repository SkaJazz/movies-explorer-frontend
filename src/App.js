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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useRef, useState } from "react";

function App() {
  // get films array from local storage on App mounting
  const [filmsArray] = useState(
    (localStorage.films && JSON.parse(localStorage.films)) || []
  );

  const handleFilmsArray = (films) => {
    localStorage.setItem("films", JSON.stringify(films));
  };

  const user = {
    name: "Михаил",
    email: "m@malyarov.com",
  };
  const refs = {
    aboutRef: useRef(null),
    techsRef: useRef(null),
    aboutMeRef: useRef(null),
  };

  const scrollToItem = (refElement) =>
    refs[refElement].current.scrollIntoView({ behavior: "smooth" });

  return (
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
            <Route path="/movies">
              <Movies
                storagedFilms={filmsArray}
                handleFilmsArray={handleFilmsArray}
              />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
            <Route path="/profile">
              <Profile user={user} />
            </Route>
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
  );
}

export default App;
