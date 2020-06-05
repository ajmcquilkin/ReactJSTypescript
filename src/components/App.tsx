import * as React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

const Welcome = () => (
  <div>
    <div>Hello, world!</div>
    <NavLink to="/test">Test</NavLink>
  </div>
);

const Test = () => (
  <div>
    This is a test of
    {' '}
    <code>react-router-dom</code>
    <NavLink to="/">Home</NavLink>
  </div>
);

const Fallback = () => (
  <div>
    Page not found
    <NavLink to="/">Home</NavLink>
  </div>
);

const App = () => (
  <Router>
    <div id="app-container">
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/test" component={Test} />
        <Route component={Fallback} />
      </Switch>
    </div>
  </Router>
);

export default App;
