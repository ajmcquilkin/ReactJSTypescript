import * as React from 'react';
import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import { RootState } from '../state';
import { incrementCounter, decrementCounter } from '../state/counters/actions';

import { clearError, createErrorSelector } from '../state/error/actions';
import { createLoadingSelector } from '../state/loading/actions';

/**
 * A basic connected welcome component with redux count example
 * Uses react-redux's connect() function and checks for corresponding props
 */
interface WelcomeProps {
  value: number;
  errorMessage: string;
  isLoading: boolean;

  increment: Function;
  decrement: Function;
  clearErr: Function;
}

const watchedActions: string[] = ['@@counters/COUNTER_INCREMENT', '@@counters/COUNTER_DECREMENT'];
const errorSelector = createErrorSelector(watchedActions);
const loadingSelector = createLoadingSelector(watchedActions);

const handleChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, change: Function) => {
  event.stopPropagation();
  change().then(() => {}).catch(() => {});
};

const Welcome = ({
  value, errorMessage, isLoading, increment, decrement, clearErr,
}: WelcomeProps) => (
  <div>
    <div>Hello, world!</div>
    <div>
      Value:
      {' '}
      {value}
    </div>

    <div>{isLoading ? 'Loading...' : errorMessage}</div>

    <button type="button" onClick={(e) => { clearErr(watchedActions); handleChange(e, increment); }}>Increment</button>
    <button type="button" onClick={(e) => { clearErr(watchedActions); handleChange(e, decrement); }}>Decrement</button>
    <NavLink to="/test">Test</NavLink>
  </div>
);

const welcomeMapStateToProps = (state: RootState) => ({
  value: state.count.value,
  errorMessage: errorSelector(state),
  isLoading: loadingSelector(state),
});

const WelcomeRedux = connect(welcomeMapStateToProps, { increment: incrementCounter, decrement: decrementCounter, clearErr: clearError })(Welcome);

/**
 * A component that tests passing in props from a <Route /> component
 */
interface TestProps {
  testString: string;
}

const Test: React.FC<TestProps> = ({ testString }) => (
  <div>
    This is a test of
    {' '}
    <code>react-router-dom</code>
    {' '}
    with test prop
    {' '}
    {testString}

    {/* Demo process.env */}
    {process.env.PUBLIC_URL}
    <NavLink to="/">Home</NavLink>
  </div>
);

// Equivalent code to above
// function Test({ testString }: TestProps) {
//   return (
//     <div>
//       This is a test of
//       {' '}
//       <code>react-router-dom</code>
//       {' '}
//       with test prop
//       {' '}
//       {testString}
//       <NavLink to="/">Home</NavLink>
//     </div>
//   );
// }

Test.defaultProps = {
  testString: 'Hello, world',
};

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
