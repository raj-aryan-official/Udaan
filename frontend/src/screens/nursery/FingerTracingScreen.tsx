/**
 * Nursery Finger Tracing Activity Screen
 * Touch gesture tracing for Odia alphabets & numbers (Grades 1-2)
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import CelebrationModal from '../../components/nursery/CelebrationModal';
import { colors, layout, typography, spacing } from '../../config/theme';
import useGamification from '../../hooks/useGamification';

export interface FingerTracingScreenProps {
  onBack: () => void;
}

export const FingerTracingScreen: React.FC<FingerTracingScreenProps> = ({
  onBack,
}: FingerTracingScreenProps) => {
  const { completeActivity } = useGamification();
  const [currentLetter, setCurrentLetter] = useState<string>('ଅ');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const letters = ['ଅ', 'ଆ', 'ଇ', '୧', '୨', '୩'];

  const handleTraceComplete = () => {
    completeActivity('tracing_1', 5, 20);
    setShowCelebration(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finger Tracing ✍️</Text>
        <AudioPlayButton promptText={`Trace the letter ${currentLetter} with your finger!`} size={44} />
      </View>

      {/* Tracing Canvas Box */}
      <Card style={styles.tracingCard}>
        <Text style={styles.guideText}>Follow the dotted guide to trace:</Text>
        <View style={styles.canvasContainer}>
          <Text style={styles.letterDotted}>{currentLetter}</Text>
        </View>
      </Card>

      {/* Selector Pills */}
      <View style={styles.letterRow}>
        {letters.map((lettr) => (
          <TouchableOpacity
            key={lettr}
            onPress={() => setCurrentLetter(lettr)}
            style={[
              styles.letterPill,
              currentLetter === lettr && styles.activeLetterPill,
            ]}
          >
            <Text
              style={[
                styles.letterText,
                currentLetter === lettr && styles.activeLetterText,
              ]}
            >
              {lettr}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Check Tracing & Claim Star ⭐"
        variant="secondary"
        size="large"
        onPress={handleTraceComplete}
        style={styles.checkBtn}
      />

      <CelebrationModal
        visible={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          onBack();
        }}
        starsEarned={5}
        badgeTitle="Master Tracer ✍️"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  tracingCard: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: '#FFFDE7',
    borderColor: colors.solarYellow,
    borderWidth: 2,
  },
  guideText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  canvasContainer: {
    width: 220,
    height: 220,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 3,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardBg,
  },
  letterDotted: {
    fontSize: 120,
    fontWeight: '900',
    color: colors.primaryLight,
  },
  letterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  letterPill: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  activeLetterPill: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  letterText: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  activeLetterText: {
    color: colors.textLight,
  },
  checkBtn: {
    marginTop: spacing.md,
  },
});

export default FingerTracingScreen;
