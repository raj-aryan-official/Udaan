import { StyleSheet } from 'react-native';
import { colors, typography, radius, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  widget: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: spacing.sm,
  },
  heading: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
});
