import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { BottomTabBar } from '../../../components/navigation/BottomTabBar/BottomTabBar';
import { RhymePlayerModal, RhymeData } from '../../../components/nursery/RhymePlayerModal';
import { CelebrationModal } from '../../../components/nursery/CelebrationModal';

export interface Class5To8DashboardScreenProps {
  onBack?: () => void;
  onTabPress?: (tab: 'home' | 'quiz' | 'profile' | 'games') => void;
  xpCount?: number;
  level?: number;
  onCompleteActivity?: (id: string, title: string) => void;
}

export const Class5To8DashboardScreen: React.FC<Class5To8DashboardScreenProps> = ({
  onBack,
  onTabPress,
  xpCount = 250,
  level = 2,
  onCompleteActivity,
}) => {
  const [activeLesson, setActiveLesson] = useState<RhymeData | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedTitle, setCompletedTitle] = useState('');

  const lessons = [
    {
      id: 'food-science',
      title: 'Components of Food & Balanced Diet',
      subtitle: '🥗 NCERT Science Class 6 Quiz & Video',
      grade: 'Class 6',
      category: 'Science',
      boxBg: '#DCFCE7',
      arrowBg: '#15803D',
      imageEmoji: '🥗',
      lyrics: [
        'Carbohydrates and Fats provide energy to our body.',
        'Proteins are needed for growth and tissue repair.',
        'Vitamins and Minerals protect us against diseases.',
        'A balanced diet contains all essential nutrients in proper proportion!',
        'Excellent Science Quiz completion!',
      ],
    },
    {
      id: 'integers-math',
      title: 'Integers & Number Line Quest',
      subtitle: '📐 NCERT Mathematics Class 7 Interactive',
      grade: 'Class 7',
      category: 'Mathematics',
      boxBg: '#E0E7FF',
      arrowBg: '#1E40AF',
      imageEmoji: '📐',
      lyrics: [
        'Integers include zero, positive, and negative numbers.',
        'On a number line, numbers increase as we move to the right.',
        'Adding a positive integer moves right (+).',
        'Adding a negative integer moves left (-).',
        'Mastered Integers & Rational Numbers!',
      ],
    },
    {
      id: 'light-motion',
      title: 'Light, Reflection & Lenses',
      subtitle: '💡 NCERT Physics Class 8 Video',
      grade: 'Class 8',
      category: 'Physics',
      boxBg: '#FEF3C7',
      arrowBg: '#D97706',
      imageEmoji: '💡',
      lyrics: [
        'Light travels in a straight line.',
        'Reflection occurs when light bounces off a smooth polished surface.',
        'The angle of incidence equals the angle of reflection (i = r).',
        'Convex lenses converge light rays to a focal point.',
        'Outstanding Physics Quest completed!',
      ],
    },
  ];

  const handleSelectLesson = (item: RhymeData) => {
    setActiveLesson(item);
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
          {/* Level & XP Banner */}
          <View style={styles.xpBanner}>
            <View style={styles.levelChip}>
              <Text style={styles.levelText}>🏆 Level {level}</Text>
            </View>
            <Text style={styles.xpTitle}>{xpCount} XP Earned</Text>
            <Text style={styles.xpSubtitle}>Complete lessons & quizzes to climb Class Leaderboards!</Text>
          </View>

          <Text style={styles.sectionTitle}>Middle School NCERT Subjects (Class 5 - 8) 🔬</Text>

          <View style={styles.listContainer}>
            {lessons.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={styles.card}
                onPress={() => handleSelectLesson(item)}
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
        rhyme={activeLesson}
        onClose={() => setShowPlayer(false)}
        onComplete={handleComplete}
      />

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message={`You mastered ${completedTitle || 'the topic'}! 🎉`}
        starsEarned={50}
        plantGrew={false}
        badgeName="Quiz Champion"
      />

      <BottomTabBar activeTab="home" onTabPress={(tab) => onTabPress?.(tab)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 12 },
  xpBanner: {
    backgroundColor: '#312E81',
    borderRadius: 20,
    padding: 18,
    marginVertical: 8,
  },
  levelChip: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  levelText: { fontSize: 12, fontWeight: '800', color: '#FFFFFF' },
  xpTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
  xpSubtitle: { fontSize: 13, color: '#C7D2FE', marginTop: 4 },
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

export default Class5To8DashboardScreen;
