/**
 * Celebration Popup Modal Component
 * Displays cheerful reward modal with stars, coins and unlocked badge
 * Udaan — Rural Education Platform
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from '../common/Modal';
import Button from '../common/Button';
import StarCounter from '../gamification/StarCounter';
import { colors, typography, spacing } from '../../config/theme';
import soundService from '../../services/soundService';

export interface CelebrationModalProps {
  visible: boolean;
  onClose: () => void;
  starsEarned?: number;
  badgeTitle?: string;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  visible,
  onClose,
  starsEarned = 5,
  badgeTitle,
}: CelebrationModalProps) => {
  useEffect(() => {
    if (visible) {
      soundService.playEffect('fanfare');
    }
  }, [visible]);

  return (
    <Modal visible={visible} onClose={onClose} title="🎉 Shabash! Great Job!">
      <View style={styles.content}>
        <Text style={styles.trophyEmoji}>🏆</Text>
        <Text style={styles.congratsText}>You completed the activity!</Text>

        <View style={styles.rewardRow}>
          <StarCounter count={starsEarned} size="large" />
        </View>

        {badgeTitle ? (
          <View style={styles.badgeBox}>
            <Text style={styles.badgeHeader}>🏅 New Badge Unlocked!</Text>
            <Text style={styles.badgeName}>{badgeTitle}</Text>
          </View>
        ) : null}

        <Button title="Continue Learning 🚀" variant="secondary" size="large" onPress={onClose} style={styles.button} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  trophyEmoji: {
    fontSize: 56,
    marginBottom: spacing.xs,
  },
  congratsText: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  rewardRow: {
    marginVertical: spacing.sm,
  },
  badgeBox: {
    backgroundColor: '#FFF8E1',
    borderColor: colors.solarYellow,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    marginVertical: spacing.md,
    width: '100%',
  },
  badgeHeader: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  badgeName: {
    fontSize: typography.fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 4,
  },
  button: {
    marginTop: spacing.md,
    width: '100%',
  },
});

export default CelebrationModal;
