import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';
import Auth from './src/service/Auth';
jest.mock('./src/service/Auth');

beforeEach(() => {
  Auth.mockClear();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
  
  expect(Auth).toHaveBeenCalledTimes(1);
  const mockAuth = Auth.mock.instances[0];
  expect(mockAuth.initialize).toHaveBeenCalledTimes(1);
  expect(mockAuth.onAuthStateChanged).toHaveBeenCalledTimes(1);
});
