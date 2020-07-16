import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { RootState } from '../../state';
import { incrementCounter, decrementCounter } from '../../state/counters/actions';

import { clearError, createErrorSelector } from '../../state/error/actions';
import { createLoadingSelector } from '../../state/loading/actions';

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

export default WelcomeRedux;
