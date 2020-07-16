/* eslint-disable import/no-extraneous-dependencies */
// // Reference: https://redux.js.org/recipes/writing-tests/#connected-components

import React from 'react';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

// import { createStore, Store } from 'redux';
import { render } from '@testing-library/react';
// import { Provider } from 'react-redux';

// function render(
//   ui: React.ReactElement,
//   {
//     (initialState: any),
//     ...(renderOptions: any),
//   },
// ) {
//   const store = createStore(reducer, initialState)
//   function Wrapper({ children }: { children: React.ReactChild }) {
//     return <Provider store={store}>{children}</Provider>;
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// export * from '@testing-library/react';
// export { render };

export function renderWithRouter(children: JSX.Element, renderOptions?: any) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        {children}
        <Route exact path="/">Hello, world!</Route>
      </Router>,
      renderOptions,
    ),
  };
}

export const emptyAction: Action = {
  type: '',
};
