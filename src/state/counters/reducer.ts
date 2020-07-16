import { Reducer } from 'redux';
import { CounterState, CounterActionTypes } from './types';

/**
 * A type-safe initial state, declared in ./types.ts
 */
const initialState: CounterState = {
  value: 0,
};

/**
 * Creates a reduer with the shape specified in ./types.ts
 * @param state passed into the createRootReducer function in state/index.ts
 * @param action action to be processed
 */
const reducer: Reducer<CounterState> = (state = initialState, action) => {
  switch (action.type) {
    case CounterActionTypes.COUNTER_INCREMENT_SUCCESS: {
      return { ...state, value: state.value + 1 };
    } case CounterActionTypes.COUNTER_DECREMENT_SUCCESS: {
      return { ...state, value: state.value - 1 };
    } case CounterActionTypes.COUNTER_SET_SUCCESS: {
      return { ...state, value: action.payload };
    } default: {
      return state;
    }
  }
};

export default reducer;
