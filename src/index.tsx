// Inspiration: https://github.com/supasate/connected-react-router/blob/master/examples/typescript/src/configureStore.tsx

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import App from './components/App';
import createRootReducer from './state';

const history = createBrowserHistory();

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
  createRootReducer(history), {},
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('main'),
);
