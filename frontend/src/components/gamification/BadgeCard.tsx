/**
 * Achievement Badge Card Component
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';

export interface BadgeCardProps {
  title: string;
  description: string;
  unlocked?: boolean;
  unlockedAt?: string;
  iconEmoji?: string;
  style?: ViewStyle;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({
  title,
  description,
  unlocked = false,
  unlockedAt,
  iconEmoji = '🏅',
  style,
}: BadgeCardProps) => {
  return (
    <View style={[styles.card, unlocked ? styles.cardUnlocked : styles.cardLocked, style]}>
      <Text style={[styles.icon, !unlocked && styles.iconLocked]}>
        {unlocked ? iconEmoji : '🔒'}
      </Text>
      <View style={styles.content}>
        <Text style={[styles.title, !unlocked && styles.textLocked]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {unlocked && unlockedAt ? (
          <Text style={styles.unlockedDate}>Unlocked {unlockedAt}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    marginVertical: spacing.xs,
    borderWidth: 1.5,
  },
  cardUnlocked: {
    backgroundColor: '#F1F8E9',
    borderColor: colors.primary,
  },
  cardLocked: {
    backgroundColor: '#F5F5F5',
    borderColor: colors.disabled,
  },
  icon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  iconLocked: {
    opacity: 0.6,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  textLocked: {
    color: colors.textMuted,
  },
  description: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  unlockedDate: {
    fontSize: 10,
    color: colors.primaryDark,
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default BadgeCard;
