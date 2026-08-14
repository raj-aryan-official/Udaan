/**
 * Welcome / Role Selection Entry Screen
 * High-contrast tactile buttons for Mobile PIN Login vs One-Tap Guest Access
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BigPillButton from '../../components/common/BigPillButton';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import { colors, typography, spacing } from '../../config/theme';
import useAuth from '../../hooks/useAuth';

export interface WelcomeScreenProps {
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigateLogin,
  onNavigateRegister,
}: WelcomeScreenProps) => {
  const { loginGuest, isLoading } = useAuth();

  const voicePrompt = 'Swagatam! Welcome to Udaan Rural Education. Tap yellow button to start instantly, or green button to login with PIN.';

  return (
    <View style={styles.container}>
      {/* Header & Logo */}
      <View style={styles.header}>
        <Text style={styles.logoEmoji}>🚀</Text>
        <Text style={styles.title}>Udaan</Text>
        <Text style={styles.subTitle}>Odisha Rural Learning Platform</Text>
      </View>

      {/* Audio Guide Prompt */}
      <View style={styles.audioRow}>
        <AudioPlayButton promptText={voicePrompt} size={52} />
        <Text style={styles.audioHint}>Tap speaker for Odia voice instructions 🔊</Text>
      </View>

      {/* Main Tactile Buttons */}
      <View style={styles.buttonContainer}>
        {/* Quick Guest Start */}
        <BigPillButton
          title="Instant Guest Start 🎉"
          subTitle="No Mobile / PIN Needed • Start Learning"
          emojiIcon="⭐"
          color={colors.solarYellow}
          textColor={colors.textPrimary}
          onPress={loginGuest}
          disabled={isLoading}
        />

        {/* Student / Teacher Mobile PIN Login */}
        <BigPillButton
          title="Mobile PIN Login 📱"
          subTitle="Enter 10-digit mobile & 4-digit PIN"
          emojiIcon="🔐"
          color={colors.primary}
          textColor={colors.textLight}
          onPress={onNavigateLogin}
          disabled={isLoading}
        />

        {/* Register New Account */}
        <BigPillButton
          title="New Student Registration 📝"
          subTitle="Join your school class & earn stars"
          emojiIcon="🌱"
          color={colors.secondary}
          textColor={colors.textLight}
          onPress={onNavigateRegister}
          disabled={isLoading}
        />
      </View>

      <Text style={styles.footer}>SIH 2025 • Designed for Rural Odisha Schools 🇮🇳</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  logoEmoji: {
    fontSize: 64,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '900',
    color: colors.primary,
    marginTop: spacing.xs,
  },
  subTitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: 2,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    padding: spacing.sm,
    marginVertical: spacing.sm,
  },
  audioHint: {
    fontSize: typography.fontSize.xs,
    color: colors.primaryDark,
    fontWeight: 'bold',
    marginLeft: spacing.xs,
  },
  buttonContainer: {
    marginVertical: spacing.md,
  },
  footer: {
    textAlign: 'center',
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
});

export default WelcomeScreen;
