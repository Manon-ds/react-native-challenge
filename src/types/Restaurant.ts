
export interface RestaurantList {
  "data": Restaurant
}

export interface Restaurant {
  "restaurant": {
    "items": RestaurantItem[],
  }
}

export interface RestaurantItem {
  "name": string,
  "url": string,
  "geo": {
    "address": {
      "streetAddress": string,
      "addressLocality": string,
      "postalCode": string
    }
  }
}
