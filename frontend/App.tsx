import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import {
  StoreProvider,
  useAuth,
  useStudent,
  useLearning,
  useRewards,
} from './src/store';
import { ScreenStep } from './src/types/navigation';
import { SplashScreen } from './src/screens/Splash';
import { LoginScreen } from './src/screens/Auth/Login';
import { OTPVerificationScreen } from './src/screens/Auth/OTPVerification';
import { ClassSelectionScreen } from './src/screens/Student/ClassSelection/ClassSelectionScreen';
import { NurseryHomeScreen } from './src/screens/Nursery/NurseryHome';
import { RhymesActivityListScreen } from './src/screens/Nursery/Rhymes';
import { NurseryCelebrationScreen } from './src/screens/Nursery/NurseryCelebration';
import { StickerCollectionScreen } from './src/screens/Class2To4/Dashboard/StickerCollectionScreen';
import { Class2To4DashboardScreen } from './src/screens/Class2To4/Dashboard/Class2To4DashboardScreen';
import { Class5To8DashboardScreen } from './src/screens/Class5To8/Dashboard/Class5To8DashboardScreen';
import { Class9To10DashboardScreen } from './src/screens/Class9To10/Dashboard/Class9To10DashboardScreen';
import { ProfileScreen } from './src/screens/Student/ProfileScreen';
import { ShapesLearningScreen } from './src/screens/Nursery/Shapes/ShapesLearningScreen';
import { LettersPhonicsScreen } from './src/screens/Nursery/Letters/LettersPhonicsScreen';
import { CountingNumbersScreen } from './src/screens/Nursery/Numbers/CountingNumbersScreen';
import { NatureWorldExplorerScreen } from './src/screens/Nursery/World/NatureWorldExplorerScreen';
import { KidsBrainGamesScreen } from './src/screens/Games/KidsBrainGamesScreen';
import { FloatingBunnyAIChatbot } from './src/components/nursery/FloatingBunnyAIChatbot';
import { QuizEngineModal, ALL_CLASS_QUIZZES_REGISTRY, QuizData } from './src/components/learning/QuizEngineModal';
import { LeaderboardModal } from './src/components/rewards/LeaderboardModal';
import { CLASS_CURRICULUM_DATA } from './src/data/classContent';

type AppStep = ScreenStep | 'profileScreen' | 'shapesScreen' | 'lettersScreen' | 'numbersScreen' | 'natureWorldScreen' | 'gamesScreen';

function AppContent() {
  const [currentStep, setCurrentStep] = useState<AppStep>('splash');
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null);
  const [natureCategory, setNatureCategory] = useState<'animals' | 'birds' | 'fruits' | 'nature'>('animals');

  const auth = useAuth();
  const student = useStudent();
  const learning = useLearning();
  const rewards = useRewards();

  const [userData, setUserData] = useState({
    studentName: '',
    phoneNumber: '',
    childName: '',
    selectedClass: 'nursery',
  });

  const navigateTo = (step: AppStep) => {
    setCurrentStep(step);
  };

  const handleBottomTabPress = (tab: 'home' | 'quiz' | 'profile' | 'games') => {
    if (tab === 'home') navigateTo('nurseryHome');
    if (tab === 'games' || tab === 'quiz') {
      navigateTo('gamesScreen');
    }
    if (tab === 'profile') navigateTo('profileScreen');
  };

  // Fetch initial gamification profile & learning catalog when step or class changes
  useEffect(() => {
    if (currentStep === 'nurseryHome' || currentStep === 'nurseryRhymes' || currentStep === 'profileScreen') {
      rewards.fetchGamificationProfile();
      rewards.fetchLeaderboard({ scope: 'class' });
      const activeData = CLASS_CURRICULUM_DATA[userData.selectedClass] || CLASS_CURRICULUM_DATA.nursery;
      learning.fetchContents({ gradeBand: activeData.gradeBand });
    }
  }, [currentStep, userData.selectedClass]);

  const handleLogin = async (name: string) => {
    setUserData((prev) => ({ ...prev, studentName: name }));
    await auth.guestLogin('Nursery');
    navigateTo('otp');
  };

  const handleContinueAsGuest = async () => {
    setUserData((prev) => ({ ...prev, studentName: 'Guest Scholar' }));
    await auth.guestLogin('Nursery');
    navigateTo('otp');
  };

  const handleStartLearning = async (name: string, cls: string) => {
    setUserData((prev) => ({ ...prev, childName: name, selectedClass: cls }));
    if (auth.isAuthenticated) {
      await student.updateProfile({ name, grade: cls });
    }
    navigateTo('nurseryHome');
  };

  const handleSelectActivity = async (activityId: string, title: string) => {
    const result = await learning.completeActivity(activityId, { score: 100 });
    if (result.success) {
      await rewards.fetchGamificationProfile();
    }
  };

  const handleCompleteQuiz = async (scorePercent: number, starsEarned: number) => {
    if (rewards.profile) {
      rewards.setProfile({
        ...rewards.profile,
        stars: rewards.profile.stars + starsEarned,
        coins: rewards.profile.coins + 10,
      });
    }
  };

  const handleBonusReward = (bonusStars: number) => {
    if (rewards.profile) {
      rewards.setProfile({
        ...rewards.profile,
        stars: rewards.profile.stars + bonusStars,
      });
    }
  };

  const currentStars = rewards.profile?.stars ?? 120;
  const currentCoins = rewards.profile?.coins ?? 45;
  const currentStreak = rewards.profile?.streak ?? 3;
  const currentXP = rewards.profile?.xp ?? 250;
  const currentLevel = rewards.profile?.level ?? 2;
  const plantStage = rewards.profile?.plantStage ?? 1;
  const petMood = rewards.profile?.petMood ?? 'happy';

  const activeCurriculum = CLASS_CURRICULUM_DATA[userData.selectedClass] || CLASS_CURRICULUM_DATA.nursery;
  const showFloatingChatbot = currentStep === 'nurseryHome' || currentStep === 'nurseryRhymes' || currentStep === 'lettersScreen' || currentStep === 'numbersScreen' || currentStep === 'shapesScreen' || currentStep === 'natureWorldScreen' || currentStep === 'gamesScreen';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.screenWrapper}>
        {/* Step 1: Splash Screen */}
        {currentStep === 'splash' && (
          <SplashScreen onNext={() => navigateTo('login')} />
        )}

        {/* Step 2: Login Screen */}
        {currentStep === 'login' && (
          <LoginScreen
            onLogin={handleLogin}
            onContinueAsGuest={handleContinueAsGuest}
          />
        )}

        {/* Step 3: OTP Verification Screen */}
        {currentStep === 'otp' && (
          <OTPVerificationScreen
            onVerify={() => navigateTo('classSetup')}
          />
        )}

        {/* Step 4: Class Setup Screen */}
        {currentStep === 'classSetup' && (
          <ClassSelectionScreen
            onStartLearning={handleStartLearning}
          />
        )}

        {/* Step 5: Grade-Specific Dashboard Screens */}
        {currentStep === 'nurseryHome' && (
          <View style={{ flex: 1 }}>
            {activeCurriculum.gradeBand === 'nursery_1' && (
              <NurseryHomeScreen
                starCount={currentStars}
                plantStage={plantStage}
                petMood={petMood}
                onRewardGranted={handleBonusReward}
                onSelectCategory={(cat) => {
                  if (cat === 'letters') navigateTo('lettersScreen');
                  else if (cat === 'numbers') navigateTo('numbersScreen');
                  else if (cat === 'shapes') navigateTo('shapesScreen');
                  else if (cat === 'games') navigateTo('gamesScreen');
                  else if (cat === 'animals' || cat === 'birds' || cat === 'fruits' || cat === 'nature') {
                    setNatureCategory(cat);
                    navigateTo('natureWorldScreen');
                  } else {
                    navigateTo('nurseryRhymes');
                  }
                }}
                onTabPress={handleBottomTabPress}
              />
            )}

            {activeCurriculum.gradeBand === 'class_2_4' && (
              <Class2To4DashboardScreen
                starCount={currentStars}
                coinCount={currentCoins}
                streakCount={currentStreak}
                onTabPress={handleBottomTabPress}
                onCompleteActivity={handleSelectActivity}
              />
            )}

            {activeCurriculum.gradeBand === 'class_5_8' && (
              <Class5To8DashboardScreen
                xpCount={currentXP}
                level={currentLevel}
                onTabPress={handleBottomTabPress}
                onCompleteActivity={handleSelectActivity}
              />
            )}

            {activeCurriculum.gradeBand === 'class_9_10' && (
              <Class9To10DashboardScreen
                xpCount={currentXP}
                onTabPress={handleBottomTabPress}
                onCompleteActivity={handleSelectActivity}
              />
            )}
          </View>
        )}

        {/* Step 6: Nursery Rhymes Screen */}
        {currentStep === 'nurseryRhymes' && (
          <RhymesActivityListScreen
            starCount={currentStars}
            onBack={() => navigateTo('nurseryHome')}
            onSelectRhyme={handleSelectActivity}
            onTabPress={handleBottomTabPress}
          />
        )}

        {/* Step 7: Letters & Phonics Screen */}
        {currentStep === 'lettersScreen' && (
          <LettersPhonicsScreen
            onBack={() => navigateTo('nurseryHome')}
            onRewardBonus={handleBonusReward}
          />
        )}

        {/* Step 8: Count 1 to 10 Screen */}
        {currentStep === 'numbersScreen' && (
          <CountingNumbersScreen
            onBack={() => navigateTo('nurseryHome')}
            onRewardBonus={handleBonusReward}
          />
        )}

        {/* Step 9: Shapes & Colors Screen */}
        {currentStep === 'shapesScreen' && (
          <ShapesLearningScreen
            onBack={() => navigateTo('nurseryHome')}
            onRewardBonus={handleBonusReward}
          />
        )}

        {/* Step 10: Nature & World Explorer Screen */}
        {currentStep === 'natureWorldScreen' && (
          <NatureWorldExplorerScreen
            initialCategory={natureCategory}
            onBack={() => navigateTo('nurseryHome')}
            onRewardBonus={handleBonusReward}
          />
        )}

        {/* Step 11: Brain Boosting Kids Games Screen */}
        {currentStep === 'gamesScreen' && (
          <KidsBrainGamesScreen
            onBack={() => navigateTo('nurseryHome')}
            onRewardBonus={handleBonusReward}
          />
        )}

        {/* Step 12: Nursery Celebration Screen */}
        {currentStep === 'nurseryCelebration' && (
          <NurseryCelebrationScreen
            onNext={() => navigateTo('stickerBook')}
          />
        )}

        {/* Step 13: Sticker Book Collection Screen */}
        {currentStep === 'stickerBook' && (
          <StickerCollectionScreen
            onBack={() => navigateTo('nurseryHome')}
          />
        )}

        {/* Step 14: Student Profile Screen */}
        {currentStep === 'profileScreen' && (
          <ProfileScreen
            onBack={() => navigateTo('nurseryHome')}
            onLogout={() => navigateTo('login')}
            onTabPress={handleBottomTabPress}
          />
        )}
      </View>

      {/* Floating Bunny AI Chatbot Trigger */}
      {showFloatingChatbot && (
        <FloatingBunnyAIChatbot onRewardBonus={handleBonusReward} />
      )}

      {/* Class Quiz Engine Modal */}
      <QuizEngineModal
        visible={showQuizModal}
        quiz={activeQuiz}
        onClose={() => setShowQuizModal(false)}
        onCompleteQuiz={handleCompleteQuiz}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        visible={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        leaderboardItems={rewards.leaderboard}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  screenWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    maxWidth: 600,
    backgroundColor: '#F8FAFC',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
});
