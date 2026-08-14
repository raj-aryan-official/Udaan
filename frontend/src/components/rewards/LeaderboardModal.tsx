import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LeaderboardItem } from '../../types/rewards';

export interface LeaderboardModalProps {
  visible: boolean;
  onClose: () => void;
  leaderboardItems?: LeaderboardItem[];
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  visible,
  onClose,
  leaderboardItems = [
    { userId: '1', name: 'Aarav Sharma', score: 450, rank: 1 },
    { userId: '2', name: 'Priya Dash', score: 380, rank: 2 },
    { userId: '3', name: 'Rahul Patnaik', score: 310, rank: 3 },
    { userId: '4', name: 'Ananya Sahoo', score: 280, rank: 4 },
  ],
}) => {
  const [scope, setScope] = useState<'class' | 'school'>('class');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>🏆 Leaderboard Rankings</Text>
            <TouchableOpacity onPress={onClose}>
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <Path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Scope Toggle */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, scope === 'class' && styles.activeToggle]}
              onPress={() => setScope('class')}
            >
              <Text style={[styles.toggleText, scope === 'class' && styles.activeToggleText]}>Class Ranking</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, scope === 'school' && styles.activeToggle]}
              onPress={() => setScope('school')}
            >
              <Text style={[styles.toggleText, scope === 'school' && styles.activeToggleText]}>School Ranking</Text>
            </TouchableOpacity>
          </View>

          {/* Leaderboard List */}
          <ScrollView style={styles.list}>
            {leaderboardItems.map((item) => (
              <View key={item.userId} style={styles.itemRow}>
                <View style={[styles.rankBadge, item.rank === 1 ? styles.goldRank : item.rank === 2 ? styles.silverRank : styles.bronzeRank]}>
                  <Text style={styles.rankText}>#{item.rank}</Text>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemScore}>{item.score} XP</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 14,
  },
  toggleBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  activeToggle: { backgroundColor: '#2563EB' },
  toggleText: { fontSize: 13, fontWeight: '700', color: '#64748B' },
  activeToggleText: { color: '#FFFFFF' },
  list: { maxHeight: 280 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  goldRank: { backgroundColor: '#F59E0B' },
  silverRank: { backgroundColor: '#94A3B8' },
  bronzeRank: { backgroundColor: '#D97706' },
  rankText: { fontSize: 13, fontWeight: '800', color: '#FFFFFF' },
  itemName: { flex: 1, fontSize: 15, fontWeight: '700', color: '#1E293B' },
  itemScore: { fontSize: 14, fontWeight: '800', color: '#2563EB' },
});

export default LeaderboardModal;
