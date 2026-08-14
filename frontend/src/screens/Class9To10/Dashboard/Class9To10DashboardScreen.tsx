import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { BottomTabBar } from '../../../components/navigation/BottomTabBar/BottomTabBar';
import { RhymePlayerModal, RhymeData } from '../../../components/nursery/RhymePlayerModal';
import { CelebrationModal } from '../../../components/nursery/CelebrationModal';

export interface Class9To10DashboardScreenProps {
  onBack?: () => void;
  onTabPress?: (tab: 'home' | 'quiz' | 'profile' | 'games') => void;
  xpCount?: number;
  onCompleteActivity?: (id: string, title: string) => void;
}

export const Class9To10DashboardScreen: React.FC<Class9To10DashboardScreenProps> = ({
  onBack,
  onTabPress,
  xpCount = 450,
  onCompleteActivity,
}) => {
  const [activeTopic, setActiveTopic] = useState<RhymeData | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedTitle, setCompletedTitle] = useState('');

  const boardTopics = [
    {
      id: 'quadratic-eq',
      title: 'Quadratic Equations & Real Roots',
      subtitle: '🎓 NCERT Class 10 Board Exam Challenge Quiz',
      grade: 'Class 10',
      category: 'Mathematics',
      boxBg: '#FEF3C7',
      arrowBg: '#D97706',
      imageEmoji: '🧮',
      lyrics: [
        'Standard Form: ax² + bx + c = 0 (where a ≠ 0).',
        'Discriminant D = b² - 4ac determines nature of roots.',
        'If D > 0: Two distinct real roots.',
        'If D = 0: Two equal real roots (x = -b / 2a).',
        'If D < 0: No real roots.',
        'Board Exam Mathematics Quest Completed!',
      ],
    },
    {
      id: 'chemical-reactions',
      title: 'Chemical Reactions & Balancing Equations',
      subtitle: '🧪 NCERT Class 10 Chemistry Comprehensive',
      grade: 'Class 10',
      category: 'Chemistry',
      boxBg: '#CFFAFE',
      arrowBg: '#0891B2',
      imageEmoji: '🧪',
      lyrics: [
        'Law of Conservation of Mass: Mass cannot be created nor destroyed in a chemical reaction.',
        'Balanced Equation: Equal number of atoms of each element on reactant and product sides.',
        'Types: Combination, Decomposition, Displacement, Double Displacement, Redox.',
        'Exothermic reactions release heat; Endothermic reactions absorb heat.',
        'Chemistry Board Preparation Topic Mastered!',
      ],
    },
    {
      id: 'motion-force',
      title: 'Laws of Motion & Gravitation',
      subtitle: '⚛️ NCERT Class 9 Physics Core Concepts',
      grade: 'Class 9',
      category: 'Physics',
      boxBg: '#FCE7F3',
      arrowBg: '#DB2777',
      imageEmoji: '⚛️',
      lyrics: [
        'Newton First Law: An object remains at rest or in uniform motion unless acted upon by an external net force.',
        'Second Law: Force F = m × a (Mass × Acceleration).',
        'Third Law: For every action, there is an equal and opposite reaction.',
        'Universal Law of Gravitation: F = G(m1 m2) / r².',
        'Physics Board Scholar Badge Unlocked!',
      ],
    },
  ];

  const handleSelectTopic = (item: RhymeData) => {
    setActiveTopic(item);
    setShowPlayer(true);
  };

  const handleComplete = (id: string, title: string) => {
    setShowPlayer(false);
    setCompletedTitle(title);
    setShowCelebration(true);
    onCompleteActivity?.(id, title);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showLogoBadge showStarBadge starCount={xpCount} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Certificate Progress Card */}
          <View style={styles.certCard}>
            <View style={styles.certBadge}>
              <Text style={styles.certBadgeText}>📜 Milestone Certificate</Text>
            </View>
            <Text style={styles.certTitle}>Class 10 Board Scholar Certificate</Text>
            <Text style={styles.certSubtitle}>Complete 3 board topics to download your official certificate!</Text>
          </View>

          <Text style={styles.sectionTitle}>Board Exam Prep (Class 9 & 10 NCERT) 🎓</Text>

          <View style={styles.listContainer}>
            {boardTopics.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={styles.card}
                onPress={() => handleSelectTopic(item)}
              >
                <View style={[styles.iconBox, { backgroundColor: item.boxBg }]}>
                  <Text style={{ fontSize: 28 }}>{item.imageEmoji}</Text>
                </View>

                <View style={styles.textContainer}>
                  <View style={styles.gradePill}>
                    <Text style={styles.gradeText}>{item.grade} • {item.category}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>

                <View style={[styles.arrowCircle, { backgroundColor: item.arrowBg }]}>
                  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <Path d="M5 3l14 9-14 9V3z" fill="#FFFFFF" />
                  </Svg>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <RhymePlayerModal
        visible={showPlayer}
        rhyme={activeTopic}
        onClose={() => setShowPlayer(false)}
        onComplete={handleComplete}
      />

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message={`Board Topic Mastered: ${completedTitle}! 📜`}
        starsEarned={100}
        plantGrew={false}
        badgeName="Board Scholar"
      />

      <BottomTabBar activeTab="home" onTabPress={(tab) => onTabPress?.(tab)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 12 },
  certCard: {
    backgroundColor: '#065F46',
    borderRadius: 20,
    padding: 18,
    marginVertical: 8,
  },
  certBadge: {
    backgroundColor: '#34D399',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  certBadgeText: { fontSize: 12, fontWeight: '800', color: '#064E3B' },
  certTitle: { fontSize: 20, fontWeight: '900', color: '#FFFFFF' },
  certSubtitle: { fontSize: 13, color: '#A7F3D0', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginVertical: 14 },
  listContainer: { paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: { flex: 1 },
  gradePill: {
    backgroundColor: '#F1F5F9',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  gradeText: { fontSize: 11, fontWeight: '700', color: '#475569' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  cardSubtitle: { fontSize: 12, fontWeight: '500', color: '#64748B', marginTop: 2 },
  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Class9To10DashboardScreen;
