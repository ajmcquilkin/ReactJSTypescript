import * as React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

interface WelcomeProps {

}

const Welcome: React.FC = () => (
  <div>
    <div>Hello, world!</div>
    <NavLink to="/test">Test</NavLink>
  </div>
);

interface TestProps {
  testString: string;
}

const Test: React.FunctionComponent<TestProps> = ({ testString }: TestProps) => (
  <div>
    This is a test of
    {' '}
    <code>react-router-dom</code>
    with test prop
    {' '}
    {testString}
    <NavLink to="/">Home</NavLink>
  </div>
);

const Fallback: React.SFC = () => (
  <div>
    Page not found
    <NavLink to="/">Home</NavLink>
  </div>
);

const App: React.SFC = () => (
  <Router>
    <div id="app-container">
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/test" render={() => <Test testString="Test String" />} />
        <Route component={Fallback} />
      </Switch>
    </div>
  </Router>
);

export default App;
