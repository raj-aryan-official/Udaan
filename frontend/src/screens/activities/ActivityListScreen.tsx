/**
 * Activity List & Curriculum Screen
 * Filterable view of subjects, lessons, finger tracing, and quizzes by Grade Band
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import Card from '../../components/common/Card';
import StarCounter from '../../components/gamification/StarCounter';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import { colors, layout, typography, spacing } from '../../config/theme';
import useAuth from '../../hooks/useAuth';
import useGamification from '../../hooks/useGamification';

export interface ActivityListScreenProps {
  onSelectActivity: (activity: any) => void;
  onBack: () => void;
}

export const ActivityListScreen: React.FC<ActivityListScreenProps> = ({
  onSelectActivity,
  onBack,
}: ActivityListScreenProps) => {
  const { gradeBand } = useAuth();
  const { stars } = useGamification();
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const subjects = ['All', 'Odia', 'Math', 'Science', 'English'];

  const sampleActivities = [
    {
      id: 'act_1',
      title: 'Odia Alphabet Tracing',
      subject: 'Odia',
      type: 'tracing',
      starsReward: 5,
      description: 'Trace Odia vowels ଅ, ଆ, ଇ with guided audio',
    },
    {
      id: 'act_2',
      title: 'Addition & Counting 1-10',
      subject: 'Math',
      type: 'quiz',
      starsReward: 10,
      description: 'Learn basic addition with visual mango counters',
    },
    {
      id: 'act_3',
      title: 'Plants & Banyan Tree Life Cycle',
      subject: 'Science',
      type: 'lesson',
      starsReward: 8,
      description: 'Interactive story on how seeds become trees',
    },
  ];

  const filteredActivities =
    selectedSubject === 'All'
      ? sampleActivities
      : sampleActivities.filter((a) => a.subject === selectedSubject);

  const renderActivityCard = ({ item }: ListRenderItemInfo<any>) => (
    <Card style={styles.activityCard} onPress={() => onSelectActivity(item)}>
      <View style={styles.cardHeader}>
        <View style={styles.subjectBadge}>
          <Text style={styles.subjectText}>{item.subject}</Text>
        </View>
        <StarCounter count={item.starsReward} size="small" />
      </View>

      <Text style={styles.activityTitle}>{item.title}</Text>
      <Text style={styles.activityDesc}>{item.description}</Text>

      <View style={styles.cardFooter}>
        <AudioPlayButton promptText={`${item.title}. ${item.description}`} size={36} />
        <Text style={styles.startBtnText}>Start Lesson ➔</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Modules</Text>
        <StarCounter count={stars} />
      </View>

      {/* Grade Band Banner */}
      <View style={styles.bandBanner}>
        <Text style={styles.bandText}>Showing modules for Grade Band: {gradeBand}</Text>
      </View>

      {/* Subject Filter Pills */}
      <View style={styles.filterRow}>
        {subjects.map((sub) => (
          <TouchableOpacity
            key={sub}
            onPress={() => setSelectedSubject(sub)}
            style={[
              styles.filterPill,
              selectedSubject === sub && styles.activeFilterPill,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedSubject === sub && styles.activeFilterText,
              ]}
            >
              {sub}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Activity List */}
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivityCard}
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
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
  bandBanner: {
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: layout.borderRadius.sm,
  },
  bandText: {
    fontSize: typography.fontSize.xs,
    color: colors.primaryDark,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: layout.borderRadius.pill,
    backgroundColor: colors.cardBg,
    marginRight: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilterPill: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  filterText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeFilterText: {
    color: colors.textLight,
    fontWeight: 'bold',
  },
  listContent: {
    padding: spacing.md,
  },
  activityCard: {
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.borderDark,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  subjectBadge: {
    backgroundColor: '#E1F5FE',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  subjectText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.skyBlueDark,
  },
  activityTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginVertical: 2,
  },
  activityDesc: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
  },
  startBtnText: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.secondaryDark,
  },
});

export default ActivityListScreen;
