import {RestaurantItem, RestaurantList} from '../types/Restaurant';

export const mockRestaurantItem: RestaurantItem = {
  name: 'Test Restaurant',
  url: 'https://test-restaurant.com',
  geo: {
    address: {
      streetAddress: '1 Fake Street',
      addressLocality: 'Testville',
      postalCode: 'AA0 0AA',
    },
  },
};

export const mockRestaurantItemTwo: RestaurantItem = {
  name: 'Another Restaurant',
  url: 'https://another-restaurant.com',
  geo: {
    address: {
      streetAddress: '2 Test Road',
      addressLocality: 'Fakecity',
      postalCode: 'BB1 1BB',
    },
  },
};

export const mockRestaurantList: RestaurantList = {
  data: {
    restaurant: {
      items: [mockRestaurantItem, mockRestaurantItemTwo],
    },
  },
};

export const mockEmptyRestaurantList: RestaurantList = {
  data: {
    restaurant: {
      items: [],
    },
  },
};
