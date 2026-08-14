import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { BottomTabBar } from '../../../components/navigation/BottomTabBar/BottomTabBar';
import { Class2GamificationWidget } from '../../../components/class2/Class2GamificationWidget';
import { RhymePlayerModal, RhymeData } from '../../../components/nursery/RhymePlayerModal';
import { CelebrationModal } from '../../../components/nursery/CelebrationModal';

export interface Class2To4DashboardScreenProps {
  onBack?: () => void;
  onTabPress?: (tab: 'home' | 'quiz' | 'profile' | 'games') => void;
  starCount?: number;
  coinCount?: number;
  streakCount?: number;
  onCompleteActivity?: (id: string, title: string) => void;
}

export const Class2To4DashboardScreen: React.FC<Class2To4DashboardScreenProps> = ({
  onBack,
  onTabPress,
  starCount = 120,
  coinCount = 45,
  streakCount = 3,
  onCompleteActivity,
}) => {
  const [activeVideo, setActiveVideo] = useState<RhymeData | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedTitle, setCompletedTitle] = useState('');

  const subjects = [
    {
      id: 'math-market',
      title: 'Maths Market Challenge',
      subtitle: '➕ Addition & Village Market Quiz',
      grade: 'Class 3',
      category: 'Mathematics',
      boxBg: '#FEF3C7',
      arrowBg: '#D97706',
      imageEmoji: '🧮',
      lyrics: [
        'Welcome to Village Market Math!',
        'Question 1: Uncle bought 5 apples and 4 mangoes.',
        'Total fruits = 5 + 4 = 9 fruits!',
        'Question 2: You have 10 coins and spend 4 coins for milk.',
        'Remaining coins = 10 - 4 = 6 coins!',
        'Great job completing the market quest!',
      ],
    },
    {
      id: 'science-plants',
      title: 'Plants Around Us & Leaf Types',
      subtitle: '🌱 NCERT Environmental Science Lesson',
      grade: 'Class 4',
      category: 'EVS Science',
      boxBg: '#DCFCE7',
      arrowBg: '#15803D',
      imageEmoji: '🌿',
      lyrics: [
        'Plants give us clean air, food, and shade!',
        'Leaves make food for plants using sunlight and water.',
        'Roots absorb minerals from the rich soil.',
        'Trees help keep our environment fresh and green!',
        'Protect green trees in your village!',
      ],
    },
    {
      id: 'english-grammar',
      title: 'Action Words & Nouns Quest',
      subtitle: '📖 CBSE English Grammar Video',
      grade: 'Class 2',
      category: 'English',
      boxBg: '#DBEAFE',
      arrowBg: '#1D4ED8',
      imageEmoji: '📚',
      lyrics: [
        'Nouns are names of persons, places, animals, or things.',
        'Verbs are action words like Run, Jump, Read, and Play!',
        'Example: The brown tiger runs fast in the forest.',
        'Tiger = Noun, Runs = Verb!',
        'Fantastic English grammar progress!',
      ],
    },
  ];

  const handleSelectSubject = (item: RhymeData) => {
    setActiveVideo(item);
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
      <AppHeader onBack={onBack} showLogoBadge showStarBadge starCount={starCount} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Class 2-4 Gamification Banner */}
          <Class2GamificationWidget
            stars={starCount}
            coins={coinCount}
            streak={streakCount}
            onStartMission={() => handleSelectSubject(subjects[0])}
          />

          <Text style={styles.sectionTitle}>Class 2 - 4 NCERT Lessons 📚</Text>

          <View style={styles.listContainer}>
            {subjects.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={styles.subjectCard}
                onPress={() => handleSelectSubject(item)}
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
        rhyme={activeVideo}
        onClose={() => setShowPlayer(false)}
        onComplete={handleComplete}
      />

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message={`You completed ${completedTitle || 'the lesson'}! 🎉`}
        starsEarned={5}
        plantGrew={true}
        badgeName="Maths Star"
      />

      <BottomTabBar activeTab="home" onTabPress={(tab) => onTabPress?.(tab)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginVertical: 12 },
  listContainer: { paddingBottom: 20 },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
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

export default Class2To4DashboardScreen;
