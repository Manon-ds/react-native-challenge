/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('../src/modules/NativeAppVersion', () => ({
  getConstants: () => ({
    appVersion: '1.0.0',
    buildNumber: '1',
  }),
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
