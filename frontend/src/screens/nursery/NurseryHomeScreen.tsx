/**
 * Nursery Main Dashboard Screen (Grades 1-2)
 * Tactile access to Plant Garden, Pet Companion, Tracing, and Audio Stories
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BigPillButton from '../../components/common/BigPillButton';
import PlantGrowthWidget from '../../components/nursery/PlantGrowthWidget';
import PetMoodWidget from '../../components/nursery/PetMoodWidget';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import { colors, typography, spacing } from '../../config/theme';
import useGamification from '../../hooks/useGamification';

export interface NurseryHomeScreenProps {
  onNavigateTracing: () => void;
  onNavigateStory: () => void;
  onBack: () => void;
}

export const NurseryHomeScreen: React.FC<NurseryHomeScreenProps> = ({
  onNavigateTracing,
  onNavigateStory,
  onBack,
}: NurseryHomeScreenProps) => {
  const { plantStage, petMood } = useGamification();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Main Home</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Virtual Nursery 🌿</Text>
        <AudioPlayButton promptText="Welcome to Virtual Garden! Water your plant by completing finger tracing and listening to stories." size={44} />
      </View>

      {/* Widgets */}
      <PlantGrowthWidget stage={plantStage} />
      <PetMoodWidget mood={petMood} />

      {/* Activities */}
      <Text style={styles.sectionTitle}>Nursery Activities 🎈</Text>

      <BigPillButton
        title="Finger Tracing ✍️"
        subTitle="Trace Odia Vowels & Numbers 1-10"
        emojiIcon="📝"
        color={colors.primary}
        textColor={colors.textLight}
        onPress={onNavigateTracing}
      />

      <BigPillButton
        title="Audio Folk Stories 🔊"
        subTitle="Listen to Odia stories & answer questions"
        emojiIcon="🎧"
        color={colors.solarYellow}
        textColor={colors.textPrimary}
        onPress={onNavigateStory}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  backText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
});

export default NurseryHomeScreen;
