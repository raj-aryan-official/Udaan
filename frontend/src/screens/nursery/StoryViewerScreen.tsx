/**
 * Audio Folk Story Viewer Screen
 * Odia storytelling with synchronized voice prompts & quiz questions
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import CelebrationModal from '../../components/nursery/CelebrationModal';
import { colors, typography, spacing } from '../../config/theme';
import useGamification from '../../hooks/useGamification';

export interface StoryViewerScreenProps {
  onBack: () => void;
}

export const StoryViewerScreen: React.FC<StoryViewerScreenProps> = ({
  onBack,
}: StoryViewerScreenProps) => {
  const { completeActivity } = useGamification();
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const storyTitle = 'The Wise Elephant & Banyan Tree 🐘🌳';
  const storyText =
    'Once upon a time in a green forest near Chilika Lake, a wise elephant named Kalu lived under a big Banyan tree. ' +
    'One sunny morning, a little sparrow lost its nest during heavy summer rain. Kalu used his big ears to shelter the nest!';

  const handleFinishStory = () => {
    completeActivity('story_1', 10, 40);
    setShowCelebration(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Odia Storytime 🎧</Text>
      </View>

      <Text style={styles.storyTitle}>{storyTitle}</Text>

      {/* Audio Player Card */}
      <Card style={styles.audioCard}>
        <View style={styles.audioRow}>
          <AudioPlayButton promptText={`${storyTitle}. ${storyText}`} size={56} />
          <View style={styles.audioTextContainer}>
            <Text style={styles.audioTitle}>Listen to Storyteller 🎙️</Text>
            <Text style={styles.audioSub}>Recorded in clear Odia voice prompt</Text>
          </View>
        </View>
      </Card>

      {/* Story Illustration Card */}
      <Card style={styles.illustrationCard}>
        <Text style={styles.illustrationEmoji}>🐘 🌳 🌧️ 🐦</Text>
      </Card>

      {/* Story Body */}
      <Card style={styles.textCard}>
        <Text style={styles.storyBody}>{storyText}</Text>
      </Card>

      <Button
        title="I Finished Listening 🎉"
        variant="secondary"
        size="large"
        onPress={handleFinishStory}
        style={styles.finishBtn}
      />

      <CelebrationModal
        visible={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          onBack();
        }}
        starsEarned={8}
        badgeTitle="Story Listener 🎧"
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
    marginBottom: spacing.md,
  },
  backButton: {
    marginRight: spacing.md,
  },
  backText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  storyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  audioCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 2,
    marginBottom: spacing.md,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioTextContainer: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  audioTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  audioSub: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  illustrationCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: '#E8F5E9',
    borderColor: colors.forestGreen,
    borderWidth: 2,
    marginBottom: spacing.md,
  },
  illustrationEmoji: {
    fontSize: 54,
  },
  textCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  storyBody: {
    fontSize: typography.fontSize.md,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  finishBtn: {
    marginTop: spacing.xs,
  },
});

export default StoryViewerScreen;
