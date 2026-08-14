import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PetMoodWidgetProps {
  petMood: string; // 'happy', 'joyful', 'super_happy', 'sleepy'
}

const MOOD_MAP: Record<string, { label: string; avatar: string; bg: string }> = {
  happy: { label: 'Happy Calf', avatar: '🐮', bg: '#FFF9C4' },
  joyful: { label: 'Joyful Calf', avatar: '🐮✨', bg: '#FFE082' },
  super_happy: { label: 'Dancing Calf!', avatar: '🐮🎉', bg: '#FFD54F' },
  sleepy: { label: 'Sleepy Calf', avatar: '🐮💤', bg: '#CFD8DC' },
};

export const PetMoodWidget: React.FC<PetMoodWidgetProps> = ({ petMood }) => {
  const current = MOOD_MAP[petMood] || MOOD_MAP.happy;

  return (
    <View style={[styles.card, { backgroundColor: current.bg }]}>
      <Text style={styles.petAvatar}>{current.avatar}</Text>
      <Text style={styles.petLabel}>{current.label}</Text>
      <Text style={styles.subtext}>Your companion learns with you!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  petAvatar: {
    fontSize: 48,
  },
  petLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D4037',
    marginTop: 4,
  },
  subtext: {
    fontSize: 12,
    color: '#795548',
  },
});
