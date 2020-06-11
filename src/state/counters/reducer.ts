import { Reducer } from 'redux';
import { CounterState, CounterActionTypes } from './types';

const initialState: CounterState = {
  value: 0,
};

const reducer: Reducer<CounterState> = (state = initialState, action) => {
  switch (action.type) {
    case CounterActionTypes.COUNTER_INCREMENT_SUCCESS: {
      return { ...state, value: state.value + 1 };
    } case CounterActionTypes.COUNTER_DECREMENT_SUCCESS: {
      return { ...state, value: state.value - 1 };
    } case CounterActionTypes.COUNTER_SET_SUCCESS: {
      return { ...state, value: state.value + 1 };
    } default: {
      return state;
    }
  }
};

export default reducer;
