/**
 * Nursery Plant Growth Virtual Garden Widget Component
 * Displays growing Odia virtual plant/banyan tree stage
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';

export interface PlantGrowthWidgetProps {
  stage?: 'seed' | 'sprout' | 'sapling' | 'blooming' | 'tree';
  style?: ViewStyle;
}

export const PlantGrowthWidget: React.FC<PlantGrowthWidgetProps> = ({
  stage = 'sprout',
  style,
}: PlantGrowthWidgetProps) => {
  const getPlantDetails = () => {
    switch (stage) {
      case 'seed':
        return { emoji: '🌱', label: 'Banyan Seed', status: 'Plant your learning seed!' };
      case 'sprout':
        return { emoji: '🌿', label: 'Green Sprout', status: 'Growing stronger every day!' };
      case 'sapling':
        return { emoji: '🪴', label: 'Young Sapling', status: 'Branches forming!' };
      case 'blooming':
        return { emoji: '🌸', label: 'Blooming Plant', status: 'Beautiful flowers!' };
      case 'tree':
        return { emoji: '🌳', label: 'Mighty Banyan', status: 'Master of Knowledge!' };
      default:
        return { emoji: '🌿', label: 'Green Sprout', status: 'Growing!' };
    }
  };

  const details = getPlantDetails();

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.plantEmoji}>{details.emoji}</Text>
      <Text style={styles.plantTitle}>{details.label}</Text>
      <Text style={styles.plantStatus}>{details.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F5E9',
    borderColor: colors.forestGreen,
    borderWidth: 2,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xs,
    elevation: 3,
  },
  plantEmoji: {
    fontSize: 48,
    marginBottom: spacing.xs,
  },
  plantTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.forestGreen,
  },
  plantStatus: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
});

export default PlantGrowthWidget;
