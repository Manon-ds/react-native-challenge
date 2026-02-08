import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { RestaurantItem as RestaurantItemType } from '../../types/Restaurant';

interface Props {
  restaurant: RestaurantItemType;
}

const RestaurantItem = ({ restaurant }: Props) => {
  const { name, url, geo } = restaurant;
  const { streetAddress, addressLocality, postalCode } = geo.address;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name} onPress={() => Linking.openURL(url)}>
          {name}
        </Text>
        <Text style={styles.address}>
          {streetAddress}, {postalCode} {addressLocality}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  address: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});

export default RestaurantItem;
