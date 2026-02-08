import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import RestaurantListScreen from './RestaurantList';
import { mockFetchSuccess, mockFetchFailure } from '../../testUtils/mockFetch';
import {
  mockRestaurantList,
  mockEmptyRestaurantList,
} from '../../testUtils/mockRestaurantData';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('RestaurantListScreen', () => {
  it('shows loading indicator while fetching', () => {
    globalThis.fetch = jest.fn(() => new Promise(() => {}));
    const { getByTestId } = render(<RestaurantListScreen />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders restaurant items after successful fetch', async () => {
    mockFetchSuccess(mockRestaurantList);
    const { getByText } = render(<RestaurantListScreen />);

    await waitFor(() => {
      expect(getByText('Test Restaurant')).toBeTruthy();
    });

    expect(getByText('Another Restaurant')).toBeTruthy();
  });

  it('renders error message when fetch fails', async () => {
    mockFetchFailure('Not found');
    const { getByText } = render(<RestaurantListScreen />);

    await waitFor(() => {
      expect(getByText('Error: Not found')).toBeTruthy();
    });
  });

  it('renders empty list when API returns no items', async () => {
    mockFetchSuccess(mockEmptyRestaurantList);
    const { queryByText, queryByTestId } = render(<RestaurantListScreen />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    expect(queryByText('Test Restaurant')).toBeNull();
    expect(queryByText(/Error:/)).toBeNull();
  });

  it('renders empty list for unexpected data', async () => {
    mockFetchSuccess({ unexpected: 'data' });
    const { queryByText, queryByTestId } = render(<RestaurantListScreen />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    expect(queryByText('Test Restaurant')).toBeNull();
    expect(queryByText(/Error:/)).toBeNull();
  });

  it('opens URL when a restaurant name is pressed', async () => {
    mockFetchSuccess(mockRestaurantList);
    const { getByText } = render(<RestaurantListScreen />);

    await waitFor(() => {
      expect(getByText('Test Restaurant')).toBeTruthy();
    });

    fireEvent.press(getByText('Test Restaurant'));

    expect(Linking.openURL).toHaveBeenCalledWith('https://test-restaurant.com');
  });
});
