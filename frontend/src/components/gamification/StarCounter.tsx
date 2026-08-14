/**
 * Animated Star Counter Widget
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';
import { formatStarCount } from '../../utils/formatters';

export interface StarCounterProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const StarCounter: React.FC<StarCounterProps> = ({
  count,
  size = 'medium',
  style,
}: StarCounterProps) => {
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return typography.fontSize.sm;
      case 'large':
        return typography.fontSize.xl;
      case 'medium':
      default:
        return typography.fontSize.md;
    }
  };

  const getStarSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 28;
      case 'medium':
      default:
        return 22;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.starIcon, { fontSize: getStarSize() }]}>⭐</Text>
      <Text style={[styles.countText, { fontSize: getFontSize() }]}>
        {formatStarCount(count)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDE7',
    borderColor: colors.solarYellow,
    borderWidth: 1.5,
    borderRadius: layout.borderRadius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    elevation: 2,
  },
  starIcon: {
    marginRight: 4,
  },
  countText: {
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

export default StarCounter;
