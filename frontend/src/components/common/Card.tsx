/**
 * Reusable Card Container Component
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { colors, layout, spacing } from '../../config/theme';

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  variant?: 'flat' | 'elevated' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'elevated',
}: CardProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'bordered':
        return {
          borderWidth: 2,
          borderColor: colors.borderDark,
          elevation: 0,
        };
      case 'flat':
        return {
          elevation: 0,
          backgroundColor: colors.cardBgLight,
        };
      case 'elevated':
      default:
        return {
          shadowColor: colors.shadowColor,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: layout.elevation.medium,
        };
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.card, getVariantStyle(), style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.card, getVariantStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.xs,
  },
});

export default Card;
