import './App.css';
import Header from './components/Header/Header';
import Page404 from './components/404/Page404';
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
        <Switch>
          <Route exact path="/"></Route>
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
      </div>
    </Router>
  );
}

export default App;
