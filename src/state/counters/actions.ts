// Inspiration: https://redux.js.org/recipes/usage-with-typescript/

import { action } from 'typesafe-actions';

import { ThunkActionType } from '..';
import { CounterActionTypes } from './types';

/**
 * Type-safe action creators for request, success, and failure
 */
export const incrementRequest = () => action(CounterActionTypes.COUNTER_INCREMENT_REQUEST);
export const incrementSuccess = () => action(CounterActionTypes.COUNTER_INCREMENT_SUCCESS);
export const incrementFailure = (message: string) => action(CounterActionTypes.COUNTER_INCREMENT_FAILURE, message);

export const decrementRequest = () => action(CounterActionTypes.COUNTER_DECREMENT_REQUEST);
export const decrementSuccess = () => action(CounterActionTypes.COUNTER_DECREMENT_SUCCESS);
export const decrementFailure = (message: string) => action(CounterActionTypes.COUNTER_DECREMENT_FAILURE, message);

export const setRequest = () => action(CounterActionTypes.COUNTER_SET_REQUEST);
export const setSuccess = (value: number) => action(CounterActionTypes.COUNTER_SET_SUCCESS, value);
export const setFailure = (message: string) => action(CounterActionTypes.COUNTER_SET_FAILURE, message);

/**
 * Test API - FOR SIMULATION ONLY
 */
function exampleAPISuccess() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve('Test API'); }, 1000);
  });
}

function exampleAPIFailure() {
  return Promise.reject(new Error('Test API'));
}

/**
 * Action-calling, dev-facing functions
 */
export function incrementCounter(): ThunkActionType<void> {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(incrementRequest());

    exampleAPISuccess().then(() => {
      dispatch(incrementSuccess());
      resolve();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }).catch((error: Error) => {
      dispatch(incrementFailure("Couldn't increment counter"));
      reject();
    });
  });
}

export function decrementCounter(): ThunkActionType<void> {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(decrementRequest());

    exampleAPIFailure().then(() => {
      dispatch(decrementSuccess());
      resolve();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }).catch((error: Error) => {
      dispatch(decrementFailure("Couldn't decrement counter"));
      reject();
    });
  });
}

export function setCounter(value: number): ThunkActionType<void> {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(setRequest());

    exampleAPISuccess().then(() => {
      dispatch(setSuccess(value));
      resolve();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }).catch((error: Error) => {
      dispatch(setFailure("Couldn't set counter"));
      reject();
    });
  });
}
