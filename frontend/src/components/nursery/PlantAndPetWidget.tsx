import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { BunnyLogoBadge } from '../common/Illustrations';

export interface PlantAndPetWidgetProps {
  plantStage?: number; // 1 to 5
  petMood?: string; // 'happy' | 'joyful' | 'dancing'
  onPetTap?: () => void;
}

export const PlantAndPetWidget: React.FC<PlantAndPetWidgetProps> = ({
  plantStage = 1,
  petMood = 'happy',
  onPetTap,
}) => {
  const plantDetails = [
    { title: 'Tiny Seedling', emoji: '🌱', desc: 'Finish 1 activity to grow!' },
    { title: 'Little Stem', emoji: '🌿', desc: 'Growing taller and stronger!' },
    { title: 'Green Leaves', emoji: '🪴', desc: 'So many pretty leaves!' },
    { title: 'Blooming Flower', emoji: '🌸', desc: 'A beautiful flower bloomed!' },
    { title: 'Magic Fruit Tree', emoji: '🍎', desc: 'Full of delicious golden apples!' },
  ];

  const currentPlant = plantDetails[Math.min(Math.max(plantStage - 1, 0), 4)];

  return (
    <View style={styles.container}>
      {/* 1. Plant Growth Card */}
      <View style={[styles.card, styles.plantCard]}>
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>🌱 Garden Progress</Text>
        </View>
        <Text style={styles.emojiDisplay}>{currentPlant.emoji}</Text>
        <Text style={styles.cardTitle}>{currentPlant.title}</Text>
        <Text style={styles.cardDesc}>{currentPlant.desc}</Text>

        {/* Progress Dots */}
        <View style={styles.stageDotsRow}>
          {[1, 2, 3, 4, 5].map((stg) => (
            <View
              key={stg}
              style={[
                styles.dot,
                stg <= plantStage ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* 2. Interactive Pet Card */}
      <TouchableOpacity activeOpacity={0.85} style={[styles.card, styles.petCard]} onPress={onPetTap}>
        <View style={styles.petBadgePill}>
          <Text style={styles.petBadgeText}>🐶 Learning Pet</Text>
        </View>
        <View style={styles.petAvatarWrapper}>
          <BunnyLogoBadge size={54} />
        </View>
        <Text style={styles.cardTitle}>Buddy Bunny</Text>
        <Text style={styles.speechBubble}>
          {petMood === 'dancing'
            ? '🎉 I am dancing with joy!'
            : petMood === 'joyful'
            ? '⭐ You earned stars for me!'
            : '❤️ Tap me for a high five!'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  card: {
    width: '48.5%',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 2,
  },
  plantCard: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  petCard: {
    backgroundColor: '#FFF7ED',
    borderColor: '#F97316',
  },
  badgePill: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
  petBadgePill: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  petBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C2410C',
  },
  emojiDisplay: {
    fontSize: 38,
    marginVertical: 4,
  },
  petAvatarWrapper: {
    marginVertical: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 8,
  },
  speechBubble: {
    fontSize: 11,
    fontWeight: '600',
    color: '#C2410C',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  stageDotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#10B981',
  },
  inactiveDot: {
    backgroundColor: '#A7F3D0',
  },
});
