import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  RestaurantList as RestaurantListType,
  RestaurantItem as RestaurantItemType,
} from '../../types/Restaurant';
import { useFetchRestaurants } from '../../hooks/useFetchRestaurants';
import RestaurantItem from '../../components/restaurantItem/RestaurantItem';

const RestaurantListScreen = () => {
  const { restaurants, loading, error } =
    useFetchRestaurants<RestaurantListType>(
      'https://storage.googleapis.com/nandos-engineering-public/coding-challenge-rn/restaurantlist.json',
    );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator testID="loading-indicator" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const items: RestaurantItemType[] =
    restaurants?.data?.restaurant?.items ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.url}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RestaurantListScreen;
