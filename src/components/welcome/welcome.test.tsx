// Reference: https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples/tree/master/?file=/src/__tests__/react-redux.js

import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { renderWithRouter } from '../../test-utils';

import Welcome from '.';

const mockStore = configureStore([thunk]);

describe('Welcome', () => {
  it('renders received value correctly', () => {
    const store = mockStore({
      loading: {},
      error: {},
      count: { value: 12 },
    });

    renderWithRouter(<Provider store={store}><Welcome /></Provider>);
    expect(screen.getByText(/Value/i)).toHaveTextContent(/12/i);
  });

  it('increments value correctly', async (done) => {
    const store = mockStore({
      loading: {},
      error: {},
      count: { value: 12 },
    });

    renderWithRouter(<Provider store={store}><Welcome /></Provider>);
    userEvent.click(screen.getByText('Increment'));

    // TODO: Remove this settimeout with actual API implementation
    setTimeout(() => {
      try {
        expect(screen.getByText(/Value/i)).toHaveTextContent(/14/i);
        done();
      } catch (error) {
        done(error);
      }
    }, 600);
  });
});
