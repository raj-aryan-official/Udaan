import { StyleSheet } from 'react-native';
import { colors, typography, radius, spacing } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxl,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginTop: spacing.md,
  },
  illustrationContainer: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 320,
    backgroundColor: '#E0E7FF',
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    overflow: 'hidden',
  },
  imagePlaceholderIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerSection: {
    alignItems: 'center',
    width: '100%',
  },
  progressBarBg: {
    width: 140,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  progressBarFill: {
    width: '65%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  byText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
});
