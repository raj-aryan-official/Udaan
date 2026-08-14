/**
 * Student Main Home Dashboard Screen
 * Central hub displaying Star/Coin balances, Streak, Virtual Nursery Garden & Core Nav Pills
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Card from '../../components/common/Card';
import BigPillButton from '../../components/common/BigPillButton';
import StarCounter from '../../components/gamification/StarCounter';
import CoinCounter from '../../components/gamification/CoinCounter';
import StreakBadge from '../../components/gamification/StreakBadge';
import LevelProgress from '../../components/gamification/LevelProgress';
import PlantGrowthWidget from '../../components/nursery/PlantGrowthWidget';
import PetMoodWidget from '../../components/nursery/PetMoodWidget';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import { colors, typography, spacing } from '../../config/theme';
import useAuth from '../../hooks/useAuth';
import useGamification from '../../hooks/useGamification';

export interface StudentHomeScreenProps {
  onNavigateLearn: () => void;
  onNavigateMissions: () => void;
  onNavigateLeaderboard: () => void;
  onNavigateCertificates: () => void;
  onNavigateNursery: () => void;
  onNavigateConvertGuest: () => void;
}

export const StudentHomeScreen: React.FC<StudentHomeScreenProps> = ({
  onNavigateLearn,
  onNavigateMissions,
  onNavigateLeaderboard,
  onNavigateCertificates,
  onNavigateNursery,
  onNavigateConvertGuest,
}: StudentHomeScreenProps) => {
  const { user, gradeBand, isGuest } = useAuth();
  const { stars, coins, xp, level, streakDays, plantStage, petMood } = useGamification();

  const welcomePrompt = `Namaskar ${
    user?.fullName || 'Learner'
  }! You have ${stars} stars today. Keep learning to grow your Banyan tree!`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Profile & Rewards Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.greetingText}>Namaskar! 🙏</Text>
          <Text style={styles.userName}>{user?.fullName || 'Guest Student'}</Text>
          <Text style={styles.gradeBadge}>Class {user?.grade || 1} • Band {gradeBand}</Text>
        </View>
        <View style={styles.countersRow}>
          <StarCounter count={stars} style={styles.counterMargin} />
          <CoinCounter count={coins} />
        </View>
      </View>

      {/* Guest Mode Conversion Banner */}
      {isGuest ? (
        <Card style={styles.guestCard} onPress={onNavigateConvertGuest}>
          <View style={styles.guestRow}>
            <Text style={styles.guestEmoji}>⚠️</Text>
            <View style={styles.guestTextContainer}>
              <Text style={styles.guestTitle}>You are in Guest Mode</Text>
              <Text style={styles.guestSub}>Tap to link mobile number & save stars permanently!</Text>
            </View>
          </View>
        </Card>
      ) : null}

      {/* Audio Voice Welcome */}
      <Card style={styles.voiceCard}>
        <View style={styles.voiceRow}>
          <AudioPlayButton promptText={welcomePrompt} size={48} />
          <Text style={styles.voiceText}>Tap speaker to hear daily learning guide 🔊</Text>
        </View>
      </Card>

      {/* Streak & Level Bar */}
      <Card style={styles.levelCard}>
        <View style={styles.streakHeader}>
          <StreakBadge streak={streakDays} />
          <Text style={styles.streakSub}>Keep streak active every day!</Text>
        </View>
        <LevelProgress level={level} xp={xp} />
      </Card>

      {/* Nursery Garden & Pet Widgets Row */}
      <Text style={styles.sectionTitle}>Virtual Nursery & Pet 🌿</Text>
      <TouchableOpacity activeOpacity={0.9} onPress={onNavigateNursery}>
        <PlantGrowthWidget stage={plantStage} />
        <PetMoodWidget mood={petMood} />
      </TouchableOpacity>

      {/* Core Tactile Action Buttons */}
      <Text style={styles.sectionTitle}>What do you want to learn? 🎯</Text>

      <BigPillButton
        title="Start Learning Modules 📚"
        subTitle="Odia • Math • Science • English"
        emojiIcon="📖"
        color={colors.primary}
        textColor={colors.textLight}
        onPress={onNavigateLearn}
      />

      <BigPillButton
        title="Daily Missions & Quizzes 🎯"
        subTitle="Complete tasks to earn bonus stars"
        emojiIcon="⭐"
        color={colors.secondary}
        textColor={colors.textLight}
        onPress={onNavigateMissions}
      />

      <BigPillButton
        title="Class & School Ranks 🏆"
        subTitle="See where you rank among classmates"
        emojiIcon="🥇"
        color={colors.solarYellow}
        textColor={colors.textPrimary}
        onPress={onNavigateLeaderboard}
      />

      <BigPillButton
        title="My Certificates 📜"
        subTitle="View official completion certificates"
        emojiIcon="🎓"
        color={colors.skyBlue}
        textColor={colors.textLight}
        onPress={onNavigateCertificates}
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
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  greetingText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  gradeBadge: {
    fontSize: typography.fontSize.xs,
    color: colors.primaryDark,
    fontWeight: 'bold',
    marginTop: 2,
  },
  countersRow: {
    alignItems: 'flex-end',
  },
  counterMargin: {
    marginBottom: spacing.xs,
  },
  guestCard: {
    backgroundColor: '#FFF3E0',
    borderColor: colors.secondary,
    borderWidth: 2,
    marginBottom: spacing.sm,
  },
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestEmoji: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  guestTextContainer: {
    flex: 1,
  },
  guestTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.secondaryDark,
  },
  guestSub: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  voiceCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 1.5,
    marginBottom: spacing.sm,
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceText: {
    fontSize: typography.fontSize.xs,
    color: colors.primaryDark,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
    flex: 1,
  },
  levelCard: {
    marginBottom: spacing.md,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  streakSub: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
});

export default StudentHomeScreen;
