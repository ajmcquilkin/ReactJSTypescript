// Reference: https://testing-library.com/docs/react-testing-library/example-intro

import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Test from '.';

beforeEach(() => {});
beforeAll(() => {});
afterEach(() => {});
afterAll(() => {});

function renderWithRouter(children: React.ReactElement) {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{children}</Router>),
    history,
  };
}

test('displays loaded string correctly', () => {
  const testMessage = 'Adam is cool';

  renderWithRouter(<Test testString={testMessage} />);
  expect(screen.getByText(new RegExp('Adam is cool', 'i'))).toBeVisible();

  fireEvent.click(screen.getByText('Home'));
});
