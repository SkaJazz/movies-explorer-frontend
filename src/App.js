import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Page404 from './components/404/Page404';
import MainContainer from './components/MainContainer/MainContainer';
import AboutProject from './components/AboutProject/AboutProject';
import Hero from './components/Hero/Hero';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <MainContainer>
          <Switch>
            <Route exact path="/">
              <Hero />
              <AboutProject />
            </Route>
            <Route path="/movies"></Route>
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
