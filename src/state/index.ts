// Inspiration: https://github.com/supasate/connected-react-router/blob/master/examples/typescript/

import { combineReducers, Action } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';

import countReducer from './counters/reducer';
import { CounterState } from './counters/types';

/**
 * This interface determines the top-level shape of the redux store
 * This is used by the createRootReducer function as well as by ThunkAction when creating action functions
 */
export interface RootState {
  count: CounterState,
  router: RouterState,
}

/**
 * Create a root reducer to connect to state in src/index.ts
 * @param history declared in src/index.ts
 */
const createRootReducer = (history: History) => combineReducers<RootState>({
  count: countReducer,
  router: connectRouter(history),
});

/**
 * A generic type that can be used when creating functions that dispatch redux actions
 */
export type ThunkActionType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<String>>;

export default createRootReducer;

// .
// `- store
//     |-- heroes // Handles application states inside the `/heroes` page.
//     |   |-- actions.ts
//     |   |-- reducer.ts
//     |   `-- types.ts
//     ├── layout // Handles global layout settings, e.g. theme, small/large text.
//     |   |-- actions.ts
//     |   |-- reducer.ts
//     |   `-- types.ts
//     `-- index.ts
