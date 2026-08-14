import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlantGrowthWidgetProps {
  plantStage: number; // 1: Seedling, 2: Sprout, 3: Bud, 4: Blooming, 5: Fruit Tree
}

const STAGE_LABELS: Record<number, { name: string; icon: string }> = {
  1: { name: 'Seedling', icon: '🌱' },
  2: { name: 'Sprout', icon: '🌿' },
  3: { name: 'Flower Bud', icon: '🌷' },
  4: { name: 'Blooming Flower', icon: '🌸' },
  5: { name: 'Fruit Tree', icon: '🌳' },
};

export const PlantGrowthWidget: React.FC<PlantGrowthWidgetProps> = ({ plantStage }) => {
  const current = STAGE_LABELS[plantStage] || STAGE_LABELS[1];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Village Garden</Text>
      <Text style={styles.plantIcon}>{current.icon}</Text>
      <Text style={styles.stageText}>Stage {plantStage}: {current.name}</Text>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${(plantStage / 5) * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  plantIcon: {
    fontSize: 64,
    marginVertical: 12,
  },
  stageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B5E20',
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#C8E6C9',
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});
