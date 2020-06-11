import * as React from 'react';
import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import { RootState } from '../state';
import { incrementCounter, decrementCounter } from '../state/counters/actions';

/**
 * A basic connected welcome component with redux count example
 * Uses react-redux's connect() function and checks for corresponding props
 */
interface WelcomeProps {
  value: number;
  increment: Function;
  decrement: Function;
}

const Welcome = ({ value, increment, decrement }: WelcomeProps) => (
  <div>
    <div>Hello, world!</div>
    <div>
      Value:
      {' '}
      {value}
    </div>
    <button type="button" onClick={() => increment()}>Increment</button>
    <button type="button" onClick={() => decrement()}>Decrement</button>
    <NavLink to="/test">Test</NavLink>
  </div>
);

const welcomeMapStateToProps = (state: RootState) => ({
  value: state.count.value,
});

const WelcomeRedux = connect(welcomeMapStateToProps, { increment: incrementCounter, decrement: decrementCounter })(Welcome);

/**
 * A component that tests passing in props from a <Route /> component
 */
interface TestProps {
  testString: string;
}

const Test = ({ testString }: TestProps) => (
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

/**
 * A demo 404 component with a <NavLink /> back to home
 */
const Fallback = () => (
  <div>
    Page not found
    <NavLink to="/">Home</NavLink>
  </div>
);

/**
 * This history is loaded from the redux state in src/index.ts
 * When the URL location within the app changes, this will be logged to redux
 */
interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => (
  <ConnectedRouter history={history}>
    <div id="app-container">
      <Switch>
        <Route exact path="/" component={WelcomeRedux} />
        <Route path="/test" render={() => <Test testString="Test String" />} />
        <Route component={Fallback} />
      </Switch>
    </div>
  </ConnectedRouter>
);

export default App;
