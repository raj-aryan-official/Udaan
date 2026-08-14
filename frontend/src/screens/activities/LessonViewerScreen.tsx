/**
 * Story & Lesson Content Viewer Screen
 * Renders lesson content, images, and voice prompts for low-literacy students
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import StarCounter from '../../components/gamification/StarCounter';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import { colors, typography, spacing } from '../../config/theme';
import useGamification from '../../hooks/useGamification';

export interface LessonViewerScreenProps {
  activity: {
    id: string;
    title: string;
    description: string;
    content?: string;
    starsReward?: number;
  };
  onBack: () => void;
}

export const LessonViewerScreen: React.FC<LessonViewerScreenProps> = ({
  activity,
  onBack,
}: LessonViewerScreenProps) => {
  const { completeActivity, stars } = useGamification();

  const handleFinishLesson = async () => {
    await completeActivity(activity.id, 10, 60);
    onBack();
  };

  const lessonBody =
    activity.content ||
    `Long ago in Odisha, Banyan trees were known as the shelter of village storytellers. ` +
      `When rain falls on green leaves, roots stretch deep into the soil to absorb nutrients. ` +
      `Always keep curiosity in your heart like a seed!`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <StarCounter count={stars} />
      </View>

      <Text style={styles.title}>{activity.title}</Text>

      {/* Audio Voiceover Bar */}
      <Card style={styles.audioCard}>
        <View style={styles.audioRow}>
          <AudioPlayButton promptText={`${activity.title}. ${lessonBody}`} size={52} />
          <View style={styles.audioTextContainer}>
            <Text style={styles.audioHeader}>Odia Voice Guide 🔊</Text>
            <Text style={styles.audioSub}>Tap to hear storyteller read this lesson</Text>
          </View>
        </View>
      </Card>

      {/* Main Content Body */}
      <Card style={styles.bodyCard}>
        <Text style={styles.bodyText}>{lessonBody}</Text>
      </Card>

      {/* Complete Button */}
      <Button
        title="Complete & Claim 5 Stars ⭐"
        variant="primary"
        size="large"
        onPress={handleFinishLesson}
        style={styles.completeBtn}
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
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: 'bold',
  },
  title: {
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
  audioHeader: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  audioSub: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  bodyCard: {
    padding: spacing.lg,
    marginVertical: spacing.md,
  },
  bodyText: {
    fontSize: typography.fontSize.md,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  completeBtn: {
    marginTop: spacing.md,
  },
});

export default LessonViewerScreen;
