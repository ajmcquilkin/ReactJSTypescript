// Inspiration: https://github.com/supasate/connected-react-router/blob/master/examples/typescript/src/configureStore.tsx

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from './state';

import App from './components/App';

/**
 * This will be accessable from the redux store
 */
const history = createBrowserHistory();

/**
 * Type-safe check to see if window contains "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__" function key
 */
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

/**
 * Create redux store with rootReducer and apply thunk and history middleware
 */
const store = createStore(
  createRootReducer(history), {},
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
  ),
);

/**
 * Allow the react app to access this store
 */
ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('main'),
);
