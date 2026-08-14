import { StyleSheet } from 'react-native';
import { colors, typography, radius, spacing, shadows } from '../../../theme';

export const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    width: '100%',
  },
  primaryAmber: {
    backgroundColor: colors.amber,
    ...shadows.button,
  },
  primaryNavy: {
    backgroundColor: colors.primary,
    ...shadows.button,
  },
  secondaryOutlined: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  textPrimary: {
    color: colors.white,
  },
  textSecondary: {
    color: colors.primary,
  },
  iconContainer: {
    marginLeft: spacing.sm,
  },
});
