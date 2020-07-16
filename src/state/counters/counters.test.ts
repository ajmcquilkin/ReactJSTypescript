import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import reducer from './reducer';
import { CounterActionTypes } from './types';

import { emptyAction } from '../../test-utils';

/* ------------ Actions ------------ */

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/**
 * NOTE: This testing is currently done with dummy APIs, and as such in development should use
 * network mocking to test the "failure" state of this as well.
 */
describe('Counter actions', () => {
  it('sends increment action correctly', () => {
    const store = mockStore({});

    // TODO: Fix "any" typing
    // NOTE: this request will always succeed (see above)
    return store.dispatch(actions.incrementCounter() as any).then(() => {
      const actionHistory = store.getActions();
      expect(actionHistory[0]).toEqual(actions.incrementRequest());
      expect(actionHistory[1]).toEqual(actions.incrementSuccess());
    }).catch(() => {
      const actionHistory = store.getActions();
      expect(actionHistory[0]).toEqual(actions.incrementRequest());
      expect(actionHistory[1]).toEqual(actions.decrementFailure("Couldn't increment counter"));
    });
  });

  it('sends decrement action correctly', () => {
    const store = mockStore({});

    // TODO: Fix "any" typing
    // NOTE: this request will always fail (see above)
    return store.dispatch(actions.decrementCounter() as any).then(() => {
      const actionHistory = store.getActions();
      expect(actionHistory[0]).toEqual(actions.decrementRequest());
      expect(actionHistory[1]).toEqual(actions.decrementSuccess());
    }).catch(() => {
      const actionHistory = store.getActions();
      expect(actionHistory[0]).toEqual(actions.decrementRequest());
      expect(actionHistory[1]).toEqual(actions.decrementFailure("Couldn't decrement counter"));
    });
  });

  it('sends set action correctly', () => {
    const store = mockStore({});

    // TODO: Fix "any" typing
    // NOTE: this request will always succeed (see above)
    return store.dispatch(actions.setCounter(12) as any).then(() => {
      const actionHistory = store.getActions();
      expect(actionHistory[0]).toEqual(actions.setRequest());
      expect(actionHistory[1]).toEqual(actions.setSuccess(12));
    }).catch(() => {
      const actionHistory = store.getActions();
      expect(actionHistory[0]).toEqual(actions.setRequest());
      expect(actionHistory[1]).toEqual(actions.setFailure("Couldn't set counter"));
    });
  });
});

/* ------------ Reducer ------------ */

const initialReducerState = {
  value: 15,
};

describe('Counter reducer', () => {
  it('intializes with correct initial state', () => {
    expect(reducer(initialReducerState, emptyAction))
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
