import React from 'react';
import { View, Text, StyleSheet, Linking, Pressable } from 'react-native';
import { RestaurantItem as RestaurantItemType } from '../../types/Restaurant';
import { typography, shadows, colors, spacing } from '../../theme/theme';

interface Props {
  restaurant: RestaurantItemType;
}

const RestaurantItem = ({ restaurant }: Props) => {
  const { name, url, geo } = restaurant;
  const { streetAddress, addressLocality, postalCode } = geo.address;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Pressable
          style={({ pressed }) => [
            pressed ? styles.btnPress : styles.btnNormal,
            styles.pressable,
          ]}
          onPress={() => Linking.openURL(url)}
          accessibilityRole="link"
          accessibilityLabel={`Visit ${name} website`}
          accessibilityHint="Opens the restaurant website"
        >
          <Text style={styles.title}>{name}</Text>
        </Pressable>
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
    padding: spacing.md,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...shadows.card,
  },
  pressable: {
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    minHeight: 44,
  },
  title: {
    ...typography.restaurantTitle,
  },
  address: {
    ...typography.restaurantAddress,
    marginTop: spacing.xs,
    backgroundColor: colors.contrast,
    paddingBlock: spacing.md,
    textAlign: 'center',
    color: colors.text,
  },
  btnNormal: {
    backgroundColor: colors.highlight,
  },
  btnPress: {
    backgroundColor: colors.contrast,
  },
});

export default RestaurantItem;
