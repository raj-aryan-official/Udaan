/**
 * Big Pill Button Component
 * Extra-large tactile pill button designed for rural learners and low-literacy users
 * Udaan — Rural Education Platform
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';

export interface BigPillButtonProps {
  title: string;
  subTitle?: string;
  emojiIcon?: string;
  color?: string;
  textColor?: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const BigPillButton: React.FC<BigPillButtonProps> = ({
  title,
  subTitle,
  emojiIcon,
  color = colors.primary,
  textColor = colors.textLight,
  onPress,
  disabled = false,
  style,
}: BigPillButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? colors.disabledBg : color,
        },
        style,
      ]}
    >
      {emojiIcon ? <Text style={styles.emoji}>{emojiIcon}</Text> : null}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: disabled ? colors.disabled : textColor }]}>
          {title}
        </Text>
        {subTitle ? (
          <Text style={[styles.subTitle, { color: disabled ? colors.disabled : textColor }]}>
            {subTitle}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 68,
    borderRadius: layout.borderRadius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginVertical: spacing.xs,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: layout.elevation.medium,
  },
  emoji: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: '800',
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: typography.fontSize.xs,
    opacity: 0.9,
    marginTop: 2,
    textAlign: 'center',
  },
});

export default BigPillButton;
