/**
 * Teacher Mission Assignment Screen
 * Allows rural teachers to assign homework/missions to class sections
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Button from '../../components/common/Button';
import { colors, layout, typography, spacing } from '../../config/theme';

export interface AssignMissionScreenProps {
  onBack: () => void;
}

export const AssignMissionScreen: React.FC<AssignMissionScreenProps> = ({
  onBack,
}: AssignMissionScreenProps) => {
  const [missionTitle, setMissionTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rewardStars, setRewardStars] = useState<string>('10');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleAssign = () => {
    if (!missionTitle) return;
    setIsSuccess(true);
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Assign Class Mission 🎯</Text>
      </View>

      <Text style={styles.label}>Mission Title</Text>
      <TextInput
        value={missionTitle}
        onChangeText={(val: string) => setMissionTitle(val)}
        placeholder="e.g. Complete 2 Odia Tracing Exercises"
        style={styles.input}
      />

      <Text style={styles.label}>Description & Guidelines</Text>
      <TextInput
        value={description}
        onChangeText={(val: string) => setDescription(val)}
        placeholder="Instructions for students..."
        multiline
        numberOfLines={3}
        style={[styles.input, styles.multiline]}
      />

      <Text style={styles.label}>Reward Stars</Text>
      <TextInput
        value={rewardStars}
        onChangeText={(val: string) => setRewardStars(val)}
        placeholder="10"
        keyboardType="numeric"
        style={styles.input}
      />

      {isSuccess ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>✓ Mission Assigned Successfully!</Text>
        </View>
      ) : null}

      <Button
        title="Send Mission to Class 🚀"
        variant="primary"
        size="large"
        onPress={handleAssign}
        style={styles.assignBtn}
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
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.cardBg,
    borderWidth: 2,
    borderColor: colors.borderDark,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  multiline: {
    height: 90,
    textAlignVertical: 'top',
  },
  successBox: {
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  successText: {
    color: colors.primaryDark,
    fontWeight: 'bold',
  },
  assignBtn: {
    marginTop: spacing.md,
  },
});

export default AssignMissionScreen;
