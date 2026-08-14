import { StyleSheet } from 'react-native';
import { colors, radius, spacing, shadows } from '../../../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.lg,
    padding: spacing.xl,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  cardSelected: {
    borderColor: colors.highlightBorder,
    backgroundColor: colors.highlightBg,
    ...shadows.cardSelected,
  },
});
