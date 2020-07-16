import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import Fallback from '.';

function renderWithRouter(children: React.ReactElement) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        {children}
        <Route exact path="/">Hello, world!</Route>
      </Router>,
    ),
  };
}

describe('Fallback', () => {
  it('redirects correctly to the homepage', () => {
    const { container } = renderWithRouter(<Fallback />);
    userEvent.click(screen.getByRole('link'));
    expect(container.innerHTML).toMatch(/Hello, world!/gi);
  });
});
