import { Reducer } from 'redux';
import { ErrorState } from './types';

/**
 * A type-safe initial state, declared in ./types.ts
 */
const initialState: ErrorState = {

};

/**
 * Creates a reduer with the shape specified in ./types.ts
 * @param state passed into the createRootReducer function in state/index.ts
 * @param action action to be processed
 */
const reducer: Reducer<ErrorState, { type: string, payload: string }> = (state = initialState, action) => {
  // Try to match the action ending with an error ending
  const matches = /(.*)_(REQUEST|FAILURE|CLEAR_ERR)/.exec(action.type);
  if (!matches) return state;

  // Extract information from regex call and update error message
  const [, requestName, requestState] = matches;
  return { ...state, [requestName]: requestState === 'FAILURE' ? action.payload || `${requestName} action failed` : '' };
};

export default reducer;
