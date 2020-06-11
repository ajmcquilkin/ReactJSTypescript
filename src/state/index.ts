// Inspiration: https://github.com/supasate/connected-react-router/blob/master/examples/typescript/
// Inspiration: https://medium.com/netscape/asynchronous-actions-with-redux-and-typescript-d5ff2d3818d3
// Inspiration: https://thoughtbot.com/blog/the-case-for-discriminated-union-types-with-typescript

import { combineReducers, Action } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';

import countReducer from './counters/reducer';
import { CounterState } from './counters/types';

import errorReducer from './error/reducer';
import { ErrorState } from './error/types';

import loadingReducer from './loading/reducer';
import { LoadingState } from './loading/types';

/**
 * This interface determines the top-level shape of the redux store
 * This is used by the createRootReducer function as well as by ThunkAction when creating action functions
 */
export interface RootState {
  count: CounterState,
  loading: LoadingState,
  error: ErrorState,
  router: RouterState,
}

/**
 * Create a root reducer to connect to state in src/index.ts
 * @param history declared in src/index.ts
 */
const createRootReducer = (history: History) => combineReducers<RootState>({
  count: countReducer,
  loading: loadingReducer,
  error: errorReducer,
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
