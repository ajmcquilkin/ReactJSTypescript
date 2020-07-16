import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(
  ui: React.ReactElement,
  {
    route,
    history,
  }: {
    route: string,
    history: MemoryHistory,
  } = {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  },
) {
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  return {
    ...render(
      <Router
        history={history}
      >
        {ui}
      </Router>,
    ),
    history,
  };
}
