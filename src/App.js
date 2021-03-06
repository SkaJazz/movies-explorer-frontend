import './App.css';
import {
  Switch, Route, Redirect, useHistory
} from 'react-router-dom';
import React, {
  useRef, useState, useCallback, useEffect
} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Page404 from './components/404/Page404';
import MainContainer from './components/MainContainer/MainContainer';
import AboutProject from './components/AboutProject/AboutProject';
import Techs from './components/Techs/Techs';
import AboutMe from './components/AboutMe/AboutMe';
import Hero from './components/Hero/Hero';
import Movies from './components/Movies/Movies';
import SavedMovies from './components/SavedMovies/SavedMovies';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';
import sendRequestWithErrorHandler from './utils/errorHandler';

import CurrentUser from './context/CurrentUserContext';

import mainApi from './utils/MainApi';

function App() {
  const [globalError, setGlobalError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  // get films array from local storage on App mounting
  const [filmsArray, setFilmsArray] = useState(
    (localStorage.films && JSON.parse(localStorage.films)) || []
  );

  const handleFilmsArraySave = films => {
    localStorage.setItem('films', JSON.stringify(films));
    setFilmsArray(films);
  };

  const syncFilmsArrayFromLocalStorage = () => {
    setFilmsArray(JSON.parse(localStorage.films));
  };

  const refs = {
    aboutRef: useRef(null),
    techsRef: useRef(null),
    aboutMeRef: useRef(null),
  };

  const scrollToItem = refElement =>
    refs[refElement].current.scrollIntoView({ behavior: 'smooth' });

  // GET USER INFO
  const handleGetUserInfo = useCallback(async () => {
    const token = localStorage.getItem('token')
        && JSON.parse(localStorage.getItem('token'));
    if (token) {
      const userData = await sendRequestWithErrorHandler(
        mainApi.getUserInfo(token),
        setGlobalError
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
  const handleUpdateUser = userData => {
    sendRequestWithErrorHandler(mainApi
      .updateUser({
        userData,
        token: JSON.parse(localStorage.getItem('token')),
      })
      .then(newUser => {
        setCurrentUser({ ...currentUser, ...newUser });
      }), setGlobalError);
  };

  // LOGIN
  const handleLogin = async ({ email, password }) => {
    const token = await sendRequestWithErrorHandler(
      mainApi
        .signIn({ email, password })
        .then(res => res.token),
      setGlobalError
    );

    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
      await handleGetUserInfo();
      setIsLoggedIn(true);
      history.push('/movies');
    }
  };

  // REGISTER
  const handleSignUp = async regData => {
    await sendRequestWithErrorHandler(mainApi.signUp(regData).then(user => {
      handleLogin({ email: user.email, password: regData.password });
    }), setGlobalError);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('films');
    localStorage.removeItem('filteredFilms');
    localStorage.removeItem('searchObject');
    setIsLoggedIn(false);
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
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/movies">
              <Movies
                storagedFilms={filmsArray}
                handleFilmsArray={handleFilmsArraySave}
                syncFilmsArrayFromLocalStorage={syncFilmsArrayFromLocalStorage}
              />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/saved-movies">
              <SavedMovies
                syncFilmsArrayFromLocalStorage={syncFilmsArrayFromLocalStorage}
              />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
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
        <ErrorBlock errorText={globalError} />
      </div>
    </CurrentUser.Provider>
  );
}

export default App;
