import { Reducer } from 'redux';
import { LoadingState } from './types';

/**
 * A type-safe initial state, declared in ./types.ts
 */
const initialState: LoadingState = {

};

/**
 * Creates a reduer with the shape specified in ./types.ts
 * @param state passed into the createRootReducer function in state/index.ts
 * @param action action to be processed
 */
const reducer: Reducer<LoadingState> = (state = initialState, action) => {
  // Try to match the action ending with an error ending
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);
  if (!matches) return state;

  // Extract information from regex call and update loading state
  const [, requestName, requestState] = matches; // @ts-ignore: Error in boolean checking
  return { ...state, [requestName]: requestState === 'REQUEST' && requestState !== 'CLEAR_ERR' };
};

export default reducer;
