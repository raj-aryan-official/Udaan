/**
 * Coin Counter Widget Component
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';
import { formatCoinCount } from '../../utils/formatters';

export interface CoinCounterProps {
  count: number;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const CoinCounter: React.FC<CoinCounterProps> = ({
  count,
  size = 'medium',
  style,
}: CoinCounterProps) => {
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

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.coinIcon}>🪙</Text>
      <Text style={[styles.countText, { fontSize: getFontSize() }]}>
        {formatCoinCount(count)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderColor: colors.secondary,
    borderWidth: 1.5,
    borderRadius: layout.borderRadius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    elevation: 2,
  },
  coinIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  countText: {
    fontWeight: 'bold',
    color: colors.secondaryDark,
  },
});

export default CoinCounter;
