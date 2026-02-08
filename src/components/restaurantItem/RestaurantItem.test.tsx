import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import RestaurantItem from './RestaurantItem';
import { mockRestaurantItem } from '../../testUtils/mockRestaurantData';

describe('RestaurantItem', () => {
  it('renders the restaurant name', () => {
    const { getByText } = render(
      <RestaurantItem restaurant={mockRestaurantItem} />,
    );

    expect(getByText('Test Restaurant')).toBeTruthy();
  });

  it('renders the correct address', () => {
    const { getByText } = render(
      <RestaurantItem restaurant={mockRestaurantItem} />,
    );

    expect(getByText('1 Fake Street, AA0 0AA Testville')).toBeTruthy();
  });

  it('calls Linking.openURL with the restaurant URL when name is pressed', () => {
    const { getByText } = render(
      <RestaurantItem restaurant={mockRestaurantItem} />,
    );

    fireEvent.press(getByText('Test Restaurant'));

    expect(Linking.openURL).toHaveBeenCalledWith('https://test-restaurant.com');
  });
});
