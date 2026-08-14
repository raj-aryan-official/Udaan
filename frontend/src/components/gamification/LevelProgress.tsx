/**
 * Level & XP Progress Bar Component
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';

export interface LevelProgressProps {
  level: number;
  xp: number;
  style?: ViewStyle;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  level,
  xp,
  style,
}: LevelProgressProps) => {
  // Calculate progress toward next level (e.g. 100 XP per level)
  const xpInCurrentLevel = xp % 100;
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / 100) * 100));

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.levelText}>⚡ Level {level}</Text>
        <Text style={styles.xpText}>{xp} XP</Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progressPercent}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelText: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  xpText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  barBackground: {
    height: 12,
    backgroundColor: colors.disabledBg,
    borderRadius: layout.borderRadius.pill,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.pill,
  },
});

export default LevelProgress;
