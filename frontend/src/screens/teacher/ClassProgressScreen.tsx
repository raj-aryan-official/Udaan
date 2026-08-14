/**
 * Teacher Class Progress Monitoring Dashboard
 * Real-time view of student attendance, star counts, and lesson completion
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import Card from '../../components/common/Card';
import StarCounter from '../../components/gamification/StarCounter';
import { colors, typography, spacing } from '../../config/theme';

export interface ClassProgressScreenProps {
  onBack: () => void;
}

export const ClassProgressScreen: React.FC<ClassProgressScreenProps> = ({
  onBack,
}: ClassProgressScreenProps) => {
  const students = [
    { id: '1', name: 'Priya Mohanty', stars: 450, completed: '12 lessons', status: 'Active 🔥' },
    { id: '2', name: 'Suhani Jena', stars: 380, completed: '10 lessons', status: 'Active 🔥' },
    { id: '3', name: 'Ramesh Sahu', stars: 320, completed: '8 lessons', status: 'Active 🔥' },
    { id: '4', name: 'Bikram Das', stars: 290, completed: '7 lessons', status: 'Needs boost ⚠️' },
  ];

  const renderStudentProgress = ({ item }: ListRenderItemInfo<any>) => (
    <Card style={styles.studentCard}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>
            {item.completed} • Status: {item.status}
          </Text>
        </View>
        <StarCounter count={item.stars} size="small" />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Class 3 Progress 📊</Text>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderStudentProgress}
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
    padding: spacing.md,
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
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  listContent: {
    padding: spacing.md,
  },
  studentCard: {
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  sub: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default ClassProgressScreen;
