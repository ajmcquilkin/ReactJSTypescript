// Reference: https://testing-library.com/docs/react-testing-library/example-intro

import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import renderWithRouter from 'helpers/testing';
import Test from '.';

beforeEach(() => {});
beforeAll(() => {});
afterEach(() => {});
afterAll(() => {});

test('displays loaded string correctly', () => {
  const testMessage = 'Adam is cool';

  renderWithRouter(<Test testString={testMessage} />);
  expect(screen.queryByText(testMessage)).toBeVisible();

  fireEvent.click(screen.getByText('Home'));
});
