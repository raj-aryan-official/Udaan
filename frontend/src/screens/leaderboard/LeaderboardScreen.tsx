/**
 * Leaderboard & Ranking Screen
 * Class-wise and School-wise rankings for friendly gamified motivation
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import Card from '../../components/common/Card';
import StarCounter from '../../components/gamification/StarCounter';
import { colors, layout, typography, spacing } from '../../config/theme';
import useGamification from '../../hooks/useGamification';

export interface LeaderboardScreenProps {
  onBack: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  onBack,
}: LeaderboardScreenProps) => {
  const { stars } = useGamification();
  const [tab, setTab] = useState<'class' | 'school'>('class');

  const classRankings = [
    { rank: 1, name: 'Priya Mohanty', stars: 450, isMe: false, avatar: '👧' },
    { rank: 2, name: 'Suhani Jena', stars: 380, isMe: false, avatar: '👧' },
    { rank: 3, name: 'You (Ramesh)', stars: 320, isMe: true, avatar: '👦' },
    { rank: 4, name: 'Bikram Das', stars: 290, isMe: false, avatar: '👦' },
    { rank: 5, name: 'Ankita Nayak', stars: 250, isMe: false, avatar: '👧' },
  ];

  const renderRankRow = ({ item }: ListRenderItemInfo<any>) => (
    <Card style={[styles.rankCard, item.isMe && styles.rankCardMe]}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>
          {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `#${item.rank}`}
        </Text>
      </View>
      <Text style={styles.avatar}>{item.avatar}</Text>
      <Text style={[styles.name, item.isMe && styles.nameMe]}>{item.name}</Text>
      <StarCounter count={item.stars} size="small" />
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard 🏆</Text>
        <StarCounter count={stars} />
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          onPress={() => setTab('class')}
          style={[styles.tabBtn, tab === 'class' && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === 'class' && styles.tabTextActive]}>
            My Class Rank 🏫
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('school')}
          style={[styles.tabBtn, tab === 'school' && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === 'school' && styles.tabTextActive]}>
            School Rank 🌟
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={classRankings}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={renderRankRow}
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
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: colors.primary,
  },
  listContent: {
    padding: spacing.md,
  },
  rankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  rankCardMe: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  rankBadge: {
    width: 36,
    alignItems: 'center',
  },
  rankText: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
  avatar: {
    fontSize: 24,
    marginHorizontal: spacing.xs,
  },
  name: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  nameMe: {
    color: colors.primaryDark,
  },
});

export default LeaderboardScreen;
