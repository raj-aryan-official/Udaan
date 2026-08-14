/**
 * Royal Bengal Tiger Learning Companion Pet Widget Component
 * Displays pet mood and motivational voice prompt trigger
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';
import soundService from '../../services/soundService';

export interface PetMoodWidgetProps {
  mood?: 'happy' | 'excited' | 'sleepy' | 'hungry';
  petType?: 'tiger' | 'peacock' | 'elephant';
  style?: ViewStyle;
}

export const PetMoodWidget: React.FC<PetMoodWidgetProps> = ({
  mood = 'happy',
  petType = 'tiger',
  style,
}: PetMoodWidgetProps) => {
  const getPetDetails = () => {
    let emoji = '🐯';
    if (petType === 'peacock') emoji = '🦚';
    if (petType === 'elephant') emoji = '🐘';

    switch (mood) {
      case 'excited':
        return { emoji, moodText: 'Excited! 🎉', message: 'You are doing great!' };
      case 'sleepy':
        return { emoji, moodText: 'Sleepy... 😴', message: 'Time to study and wake me up!' };
      case 'hungry':
        return { emoji, moodText: 'Hungry for stars! ⭐', message: 'Complete lessons to feed me!' };
      case 'happy':
      default:
        return { emoji, moodText: 'Happy 😊', message: 'Let us learn together!' };
    }
  };

  const details = getPetDetails();

  const handleTapPet = () => {
    soundService.playEffect('reward');
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleTapPet} style={[styles.container, style]}>
      <Text style={styles.petEmoji}>{details.emoji}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.moodBadge}>{details.moodText}</Text>
        <Text style={styles.messageText}>{details.message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.xs,
    elevation: 3,
  },
  petEmoji: {
    fontSize: 44,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  moodBadge: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.secondaryDark,
  },
  messageText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default PetMoodWidget;
