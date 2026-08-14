import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import {
  LettersIconBadge,
  NumbersIconBadge,
  ShapesIconBadge,
} from '../../../components/common/Illustrations';
import { BottomTabBar } from '../../../components/navigation/BottomTabBar/BottomTabBar';
import { PlantAndPetWidget } from '../../../components/nursery/PlantAndPetWidget';
import { CelebrationModal } from '../../../components/nursery/CelebrationModal';
import { NurseryVideoCarousel } from '../../../components/nursery/NurseryVideoCarousel';
import { styles } from './NurseryHomeScreen.styles';

export interface NurseryHomeScreenProps {
  onSelectCategory?: (category: 'rhymes' | 'letters' | 'numbers' | 'shapes' | 'animals' | 'birds' | 'fruits' | 'nature' | 'games') => void;
  onTabPress?: (tab: 'home' | 'quiz' | 'profile' | 'games') => void;
  starCount?: number;
  plantStage?: number;
  petMood?: string;
  onRewardGranted?: (stars: number) => void;
}

export const NurseryHomeScreen: React.FC<NurseryHomeScreenProps> = ({
  onSelectCategory,
  onTabPress,
  starCount = 120,
  plantStage = 1,
  petMood = 'happy',
  onRewardGranted,
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState('');
  const [currentPetMood, setCurrentPetMood] = useState(petMood);

  const handlePetTap = () => {
    setCurrentPetMood('joyful');
    setCelebrationMsg('Buddy Bunny is super happy! 🐰🎉');
    setShowCelebration(true);
    onRewardGranted?.(2);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showLogoBadge showStarBadge starCount={starCount} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Scrollable Auto-Changing YouTube Video Carousel (4s) */}
          <NurseryVideoCarousel />

          {/* Activity Option Cards */}
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#1E293B', marginTop: 12, marginBottom: 8 }}>
            Choose Your Activity 🎨
          </Text>

          <View style={styles.categoriesContainer}>

            {/* Dedicated Nursery Rhymes Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.categoryCard, { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' }]}
              onPress={() => onSelectCategory?.('rhymes')}
            >
              <Text style={{ fontSize: 38, marginBottom: 6 }}>🎵</Text>
              <Text style={[styles.categoryTitle, { color: '#78350F' }]}>Nursery Rhymes & Video Songs</Text>
            </TouchableOpacity>

            {/* 1. Letters Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.categoryCard, styles.categoryLetters]}
              onPress={() => onSelectCategory?.('letters')}
            >
              <LettersIconBadge size={54} />
              <Text style={styles.categoryTitle}>Letters & Phonics</Text>
            </TouchableOpacity>

            {/* 2. Numbers Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.categoryCard, styles.categoryNumbers]}
              onPress={() => onSelectCategory?.('numbers')}
            >
              <NumbersIconBadge size={54} />
              <Text style={styles.categoryTitle}>Count 1 to 10</Text>
            </TouchableOpacity>

            {/* 3. Shapes Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.categoryCard, styles.categoryShapes]}
              onPress={() => onSelectCategory?.('shapes')}
            >
              <ShapesIconBadge size={54} />
              <Text style={styles.categoryTitle}>Shapes & Colors</Text>
            </TouchableOpacity>

            {/* 4. Animals Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.categoryCard, { backgroundColor: '#FFEDD5', borderColor: '#F97316' }]}
              onPress={() => onSelectCategory?.('animals')}
            >
              <Text style={{ fontSize: 38, marginBottom: 6 }}>🦁</Text>
              <Text style={[styles.categoryTitle, { color: '#C2410C' }]}>Animals & Sounds</Text>
            </TouchableOpacity>

            {/* 5. Birds Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.categoryCard, { backgroundColor: '#E0F2FE', borderColor: '#0284C7' }]}
              onPress={() => onSelectCategory?.('birds')}
            >
              <Text style={{ fontSize: 38, marginBottom: 6 }}>🦚</Text>
              <Text style={[styles.categoryTitle, { color: '#0369A1' }]}>Birds & Songs</Text>
            </TouchableOpacity>

            {/* 6. Fruits Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.categoryCard, { backgroundColor: '#FEE2E2', borderColor: '#EF4444' }]}
              onPress={() => onSelectCategory?.('fruits')}
            >
              <Text style={{ fontSize: 38, marginBottom: 6 }}>🍎</Text>
              <Text style={[styles.categoryTitle, { color: '#B91C1C' }]}>Fruits & Veggies</Text>
            </TouchableOpacity>

            {/* 7. Nature Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.categoryCard, { backgroundColor: '#DCFCE7', borderColor: '#16A34A' }]}
              onPress={() => onSelectCategory?.('nature')}
            >
              <Text style={{ fontSize: 38, marginBottom: 6 }}>🏔️</Text>
              <Text style={[styles.categoryTitle, { color: '#15803D' }]}>Mountains & Rivers</Text>
            </TouchableOpacity>
          </View>

          {/* Plant Growth & Pet Widget Moved Down */}
          <PlantAndPetWidget
            plantStage={plantStage}
            petMood={currentPetMood}
            onPetTap={handlePetTap}
          />
        </ScrollView>
      </View>

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message={celebrationMsg || 'Great job interacting with Buddy Bunny! 🎉'}
        starsEarned={2}
        plantGrew={false}
        badgeName="Good Learner"
      />

      <BottomTabBar activeTab="home" onTabPress={(tab) => onTabPress?.(tab)} />
    </SafeAreaView>
  );
};

export default NurseryHomeScreen;
