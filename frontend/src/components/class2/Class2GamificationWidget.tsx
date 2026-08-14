import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export interface Class2GamificationWidgetProps {
  stars?: number;
  coins?: number;
  streak?: number;
  onStartMission?: () => void;
  onOpenShop?: () => void;
}

export const Class2GamificationWidget: React.FC<Class2GamificationWidgetProps> = ({
  stars = 120,
  coins = 45,
  streak = 3,
  onStartMission,
  onOpenShop,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Header Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricChip, styles.starChip]}>
          <Text style={styles.metricText}>⭐ {stars} Stars</Text>
        </View>
        <View style={[styles.metricChip, styles.coinChip]}>
          <Text style={styles.metricText}>🪙 {coins} Coins</Text>
        </View>
        <View style={[styles.metricChip, styles.streakChip]}>
          <Text style={styles.metricText}>🔥 {streak}-Day Streak</Text>
        </View>
      </View>

      {/* 2. Daily Mission Card */}
      <View style={styles.missionCard}>
        <View style={styles.missionHeader}>
          <Text style={styles.missionTitle}>🎯 Today's Mission</Text>
          <Text style={styles.rewardTag}>+5 Stars ⭐ | +10 Coins 🪙</Text>
        </View>
        <Text style={styles.missionDesc}>Complete 5 Maths questions to earn your Maths Star Badge!</Text>

        <TouchableOpacity style={styles.actionButton} onPress={onStartMission}>
          <Text style={styles.actionButtonText}>Start Mission Now 🚀</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Avatar Shop & Badges Row */}
      <View style={styles.featuresRow}>
        <TouchableOpacity style={[styles.featureCard, styles.shopCard]} onPress={onOpenShop}>
          <Text style={styles.featureEmoji}>🎨 Avatar Shop</Text>
          <Text style={styles.featureSub}>Unlock cool outfits & hats!</Text>
        </TouchableOpacity>

        <View style={[styles.featureCard, styles.badgeCard]}>
          <Text style={styles.featureEmoji}>🏅 Badges</Text>
          <Text style={styles.featureSub}>Maths Star & Homework Hero</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  starChip: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  coinChip: {
    backgroundColor: '#FFEDD5',
    borderColor: '#F97316',
  },
  streakChip: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },
  metricText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  missionCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
    marginBottom: 12,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  rewardTag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  missionDesc: {
    fontSize: 13,
    color: '#3B82F6',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48.5%',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1.5,
  },
  shopCard: {
    backgroundColor: '#F0FDFA',
    borderColor: '#14B8A6',
  },
  badgeCard: {
    backgroundColor: '#FAF5FF',
    borderColor: '#A855F7',
  },
  featureEmoji: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  featureSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
});
