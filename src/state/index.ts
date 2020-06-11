// Inspiration: https://github.com/supasate/connected-react-router/blob/master/examples/typescript/

import { combineReducers, Action } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';

import countReducer from './counters/reducer';
import { CounterState } from './counters/types';

const createRootReducer = (history: History) => combineReducers({
  count: countReducer,
  router: connectRouter(history),
});

export interface RootState {
  count: CounterState,
  router: RouterState,
}

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
