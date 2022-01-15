// TODO: Add main component

import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Page404 from "./components/404/Page404";
import MainContainer from "./components/MainContainer/MainContainer";
import AboutProject from "./components/AboutProject/AboutProject";
import Techs from "./components/Techs/Techs";
import AboutMe from "./components/AboutMe/AboutMe";
import Hero from "./components/Hero/Hero";
import Movies from './components/Movies/Movies';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useRef } from "react";

function App() {
  const refs = {
    aboutRef: useRef(null),
    techsRef: useRef(null),
    aboutMeRef: useRef(null)
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
              <Movies />
            </Route>
            <Route path="/saved-movies"></Route>
            <Route path="/profile"></Route>
            <Route path="/signin"></Route>
            <Route path="/signup"></Route>
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
