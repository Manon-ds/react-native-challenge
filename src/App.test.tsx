/**
 * @format
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';
import { mockFetchSuccess } from './testUtils/mockFetch';
import { mockRestaurantList } from './testUtils/mockRestaurantData';

jest.mock('../src/modules/NativeAppVersion', () => ({
  getConstants: () => ({
    appVersion: '1.0.0',
    buildNumber: '1',
  }),
}));

beforeEach(() => {
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: { restaurant: { items: [] } } }),
    } as Response),
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the app version from the native module', async () => {
  const { getByText } = render(<App />);

  await waitFor(() => {
    expect(getByText('Version: 1.0.0 (1)')).toBeTruthy();
  });
});

test('renders the restaurant list screen', async () => {
  mockFetchSuccess(mockRestaurantList);
  const { getByText } = render(<App />);

  await waitFor(() => {
    expect(getByText('Test Restaurant')).toBeTruthy();
  });
});
