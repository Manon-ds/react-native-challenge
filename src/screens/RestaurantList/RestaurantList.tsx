import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  RestaurantList as RestaurantListType,
  RestaurantItem as RestaurantItemType,
} from '../../types/Restaurant';
import { useFetchRestaurants } from '../../hooks/useFetchRestaurants';
import RestaurantItem from '../../components/restaurantItem/RestaurantItem';
import Animated, {
  FadingTransition,
  FadeInLeft,
} from 'react-native-reanimated';
import { colors, spacing, typography } from '../../theme/theme';

const RestaurantListScreen = () => {
  const { restaurants, loading, error } =
    useFetchRestaurants<RestaurantListType>(
      'https://storage.googleapis.com/nandos-engineering-public/coding-challenge-rn/restaurantlist.json',
    );

  const items = useMemo<RestaurantItemType[]>(
    () => restaurants?.data?.restaurant?.items ?? [],
    [restaurants],
  );

  const [shuffled, setShuffled] = useState<RestaurantItemType[] | null>(null);
  const [ordered, setOrdered] = useState(true);

  const shuffleList = useCallback(() => {
    const source = shuffled ?? items;
    const shuffledList = [...source];
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
    setShuffled(shuffledList);
    setOrdered(false);
  }, [shuffled, items]);

  const orderList = useCallback(() => {
    setShuffled(items);
    setOrdered(true);
  }, [items]);

  const renderItem = useCallback(
    ({ item }: { item: RestaurantItemType }) => (
      <RestaurantItem restaurant={item} />
    ),
    [],
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          accessibilityLabel="Loading"
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text accessibilityRole="alert">Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={shuffled ?? items}
        keyExtractor={(item: any) => item.url}
        renderItem={renderItem}
        itemLayoutAnimation={FadingTransition.duration(600)}
        entering={FadeInLeft}
        ListHeaderComponent={
          <View style={styles.header}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={shuffleList}
              accessibilityRole="button"
              accessibilityLabel="Shuffle restaurants"
              accessibilityHint="Shuffles the restaurant list"
            >
              <Text style={styles.buttonText}>Shuffle</Text>
            </Pressable>
            {!ordered && (
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
                onPress={orderList}
                accessibilityRole="button"
                accessibilityLabel="Order restaurants"
                accessibilityHint="Reorders the list"
              >
                <Text style={styles.buttonText}>Order List</Text>
              </Pressable>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.contrast,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.sm,
    alignSelf: 'center',
    marginVertical: spacing.lg,
    marginHorizontal: spacing.sm,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.text,
    ...typography.restaurantTitle,
  },
});

export default RestaurantListScreen;
