import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BunnyLogoBadge } from '../common/Illustrations';

export interface CelebrationModalProps {
  visible: boolean;
  onClose: () => void;
  starsEarned?: number;
  message?: string;
  plantGrew?: boolean;
  badgeName?: string;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  visible,
  onClose,
  starsEarned = 3,
  message = 'You learned 5 letters! 🎉',
  plantGrew = true,
  badgeName = 'ABC Star',
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.iconHeader}>
            <BunnyLogoBadge size={72} />
          </View>

          <Text style={styles.congratsTitle}>GREAT JOB! 🎉</Text>
          <Text style={styles.messageText}>{message}</Text>

          <View style={styles.rewardsCard}>
            <View style={styles.rewardRow}>
              <Text style={styles.rewardEmoji}>⭐</Text>
              <Text style={styles.rewardText}>+{starsEarned} Stars Earned!</Text>
            </View>

            {plantGrew && (
              <View style={styles.rewardRow}>
                <Text style={styles.rewardEmoji}>🌱</Text>
                <Text style={styles.rewardText}>Your plant grew a new leaf!</Text>
              </View>
            )}

            {badgeName && (
              <View style={styles.rewardRow}>
                <Text style={styles.rewardEmoji}>🏅</Text>
                <Text style={styles.rewardText}>{badgeName} Badge Unlocked!</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={onClose}>
            <Text style={styles.continueButtonText}>Keep Learning! 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F59E0B',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  iconHeader: {
    marginTop: -40,
    marginBottom: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 50,
    padding: 6,
    borderWidth: 3,
    borderColor: '#F59E0B',
  },
  congratsTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#D97706',
    marginBottom: 6,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 16,
  },
  rewardsCard: {
    width: '100%',
    backgroundColor: '#FFFBEB',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  rewardEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  rewardText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#78350F',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#F59E0B',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
