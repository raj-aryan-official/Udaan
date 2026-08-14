/**
 * Daily Missions & Challenges Screen
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StarCounter from '../../components/gamification/StarCounter';
import { colors, layout, typography, spacing } from '../../config/theme';
import useGamification from '../../hooks/useGamification';

export interface MissionsScreenProps {
  onBack: () => void;
}

export const MissionsScreen: React.FC<MissionsScreenProps> = ({
  onBack,
}: MissionsScreenProps) => {
  const { stars, completeActivity } = useGamification();

  const missions = [
    {
      id: 'm1',
      title: 'Complete 2 Odia Lessons',
      rewardStars: 10,
      progress: '1/2',
      completed: false,
    },
    {
      id: 'm2',
      title: 'Practice Math Counting',
      rewardStars: 15,
      progress: '0/1',
      completed: false,
    },
    {
      id: 'm3',
      title: 'Daily Streak Keeper',
      rewardStars: 5,
      progress: '1/1',
      completed: true,
    },
  ];

  const handleClaim = (missionId: string) => {
    completeActivity(missionId, 10, 30);
  };

  const renderMissionItem = ({ item }: ListRenderItemInfo<any>) => (
    <Card style={styles.missionCard}>
      <View style={styles.missionHeader}>
        <Text style={styles.missionTitle}>{item.title}</Text>
        <StarCounter count={item.rewardStars} size="small" />
      </View>
      <Text style={styles.progressText}>Progress: {item.progress}</Text>
      {item.completed ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓ Claimed</Text>
        </View>
      ) : (
        <Button
          title="Claim Reward ⭐"
          variant="secondary"
          size="small"
          onPress={() => handleClaim(item.id)}
          style={styles.claimBtn}
        />
      )}
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Missions 🎯</Text>
        <StarCounter count={stars} />
      </View>

      <FlatList
        data={missions}
        keyExtractor={(item) => item.id}
        renderItem={renderMissionItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
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
  listContent: {
    padding: spacing.md,
  },
  missionCard: {
    marginBottom: spacing.md,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  missionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  progressText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  completedBadge: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: layout.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  completedText: {
    color: colors.primaryDark,
    fontWeight: 'bold',
    fontSize: typography.fontSize.xs,
  },
  claimBtn: {
    alignSelf: 'flex-start',
  },
});

export default MissionsScreen;
