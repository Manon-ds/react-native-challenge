export const colors = {
  contrast: '#f8702c',
  background: '#fbe087',
  text: '#ffffff',
  highlight: '#0ff6c8',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const typography = {
  restaurantTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    fontFamily: 'Nandos-Regular',
  },
  restaurantAddress: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
};
