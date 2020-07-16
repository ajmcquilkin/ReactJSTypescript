import { Action } from 'redux';
import reducer from './reducer';
import { CounterActionTypes } from './types';

const dummyAction: Action = {
  type: '',
};

const initialReducerState = {
  value: 15,
};

describe('Counter reducer', () => {
  it('intializes with correct initial state', () => {
    expect(reducer(initialReducerState, dummyAction))
      .toEqual({ value: 15 });
  });

  it('increments correctly', () => {
    expect(reducer(initialReducerState, { type: CounterActionTypes.COUNTER_INCREMENT_SUCCESS }))
      .toEqual({ value: 16 });
  });

  it('decrements correctly', () => {
    expect(reducer(initialReducerState, { type: CounterActionTypes.COUNTER_DECREMENT_SUCCESS }))
      .toEqual({ value: 14 });
  });

  it('sets value correctly', () => {
    expect(reducer(initialReducerState, { type: CounterActionTypes.COUNTER_SET_SUCCESS, payload: 12 }))
      .toEqual({ value: 12 });
  });
});
