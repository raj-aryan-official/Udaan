/**
 * Fire Streak Badge Component
 * Displays consecutive active days with fire animation badge
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';
import { formatStreak } from '../../utils/formatters';

export interface StreakBadgeProps {
  streak: number;
  style?: ViewStyle;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak, style }: StreakBadgeProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{formatStreak(streak)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBE9E7',
    borderColor: colors.warmClay,
    borderWidth: 1.5,
    borderRadius: layout.borderRadius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.warmClay,
  },
});

export default StreakBadge;
