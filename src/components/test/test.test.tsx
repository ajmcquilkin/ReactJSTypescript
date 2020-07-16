// Reference: https://testing-library.com/docs/react-testing-library/example-intro
// Reference: https://blog.sapegin.me/all/react-testing-3-jest-and-react-testing-library/

// Style reference: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

// API reference: https://testing-library.com/docs/react-testing-library/cheatsheet
// API reference: https://github.com/testing-library/jest-dom

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Test from '.';

beforeEach(() => {});
beforeAll(() => {});
afterEach(() => {});
afterAll(() => {});

function renderWithRouter(children: React.ReactElement) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        {children}
        <Route exact path="/">Hello, world!</Route>
      </Router>,
    ),
    history,
  };
}

describe('Test', () => {
  const testMessage = 'Adam is cool';

  it('displays loaded string correctly', () => {
    const { container } = renderWithRouter(<Test testString={testMessage} />);
    expect(container.innerHTML).toMatch(new RegExp(testMessage, 'i'));
  });

  it('redirects correctly to the homepage', () => {
    const { container } = renderWithRouter(<Test testString={testMessage} />);
    fireEvent.click(screen.getByRole('navigation'), new MouseEvent('click', { bubbles: true }));
    expect(container.innerHTML).toMatch(/Hello, world!/gi);
  });
});
