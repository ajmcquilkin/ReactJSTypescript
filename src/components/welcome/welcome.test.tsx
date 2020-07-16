// Reference: https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples/tree/master/?file=/src/__tests__/react-redux.js

import React from 'react';
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
