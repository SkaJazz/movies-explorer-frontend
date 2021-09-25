import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/movies"></Route>
          <Route path="/saved-movies"></Route>
          <Route path="/profile"></Route>
          <Route path="/signin"></Route>
          <Route path="/signup"></Route>
          <Route path="/signup"></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
