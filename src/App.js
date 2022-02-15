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

import mainApi from "./utils/MainApi";
import { sendRequestWithErrorHandler } from './utils/commonFunctions';

import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useRef, useState, useCallback, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  let history = useHistory();

  // get films array from local storage on App mounting
  const [filmsArray, setFilmsArray] = useState(
    (localStorage.films && JSON.parse(localStorage.films)) || []
  );

  const handleFilmsArraySave = (films) => {
    localStorage.setItem("films", JSON.stringify(films));
    setFilmsArray(films);
  };

  const syncFilmsArrayFromLocalStorage = (movie) => {
    setFilmsArray(JSON.parse(localStorage.films));
  }

  const refs = {
    aboutRef: useRef(null),
    techsRef: useRef(null),
    aboutMeRef: useRef(null),
  };

  const scrollToItem = (refElement) =>
    refs[refElement].current.scrollIntoView({ behavior: "smooth" });

  // GET USER INFO
  const handleGetUserInfo = useCallback(async () => {
    const token =
      localStorage.getItem("token") &&
      JSON.parse(localStorage.getItem("token"));
    if (token) {
      const userData = await sendRequestWithErrorHandler(
        mainApi.getUserInfo(token)
      );

      if (userData) {
        setCurrentUser(userData);
      }
    }
  }, []);

  useEffect(() => {
    handleGetUserInfo();
  }, [handleGetUserInfo]);

  // UPDATE USER
  const handleUpdateUser = (userData) => {
    sendRequestWithErrorHandler(
      mainApi
        .updateUser({
          userData,
          token: JSON.parse(localStorage.getItem("token")),
        })
        .then((newUser) => {
          setCurrentUser({ ...currentUser, ...newUser });
        })
    );
  };

  //REGISTER
  const handleSignUp = async (regData) => {
    console.log(regData);
    await sendRequestWithErrorHandler(
      mainApi.signUp(regData).then(user => {
        handleLogin({email: user.email, password: regData.password})
      })
    )
  }

  // LOGIN
  const handleLogin = async ({ email, password }) => {
    const token = await sendRequestWithErrorHandler(
      mainApi.signIn({ email, password }).then((res) => {
        return res.token;
      })
    );

    if (token) {
      console.log(token, history);
      localStorage.setItem("token", JSON.stringify(token));
      await handleGetUserInfo();
      history.push("/movies");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser({ name: null, email: null });
  };

  return (
    <CurrentUser.Provider value={currentUser}>
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
                handleFilmsArray={handleFilmsArraySave}
                syncFilmsArrayFromLocalStorage={syncFilmsArrayFromLocalStorage}
              />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={currentUser.name} path="/saved-movies">
              <SavedMovies
                syncFilmsArrayFromLocalStorage={syncFilmsArrayFromLocalStorage}
              />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={currentUser.name} path="/profile">
              <Profile
                handleLogout={handleLogout}
                handleUpdateUser={handleUpdateUser}
              />
            </ProtectedRoute>
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register handleRegister={handleSignUp} />
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
    </CurrentUser.Provider>
  );
}

export default App;
