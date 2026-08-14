import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { PottedPlantRewardIcon } from '../../../components/common/Illustrations';
import { AppButton } from '../../../components/common/AppButton/AppButton';
import { styles } from './NurseryCelebrationScreen.styles';

export interface NurseryCelebrationScreenProps {
  onNext?: () => void;
}

export const NurseryCelebrationScreen: React.FC<NurseryCelebrationScreenProps> = ({ onNext }) => {
  const StarIcon = ({ size = 32 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="#F59E0B"
        stroke="#D97706"
        strokeWidth="1.5"
      />
    </Svg>
  );

  const RightArrowIcon = (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Decorative Confetti Bits Background */}
      <View style={{ position: 'absolute', top: 30, left: 30 }}>
        <Rect width="10" height="14" fill="#F59E0B" rx="2" transform="rotate(15)" />
      </View>
      <View style={{ position: 'absolute', top: 50, right: 40 }}>
        <Rect width="12" height="12" fill="#3B82F6" rx="2" transform="rotate(-25)" />
      </View>
      <View style={{ position: 'absolute', top: 120, left: 50 }}>
        <Rect width="8" height="16" fill="#EF4444" rx="2" transform="rotate(45)" />
      </View>
      <View style={{ position: 'absolute', top: 140, right: 60 }}>
        <Rect width="14" height="10" fill="#10B981" rx="2" transform="rotate(-15)" />
      </View>

      <View style={styles.container}>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Text style={styles.title}>You learned 5 letters!</Text>

          {/* 3 Gold Stars */}
          <View style={styles.starsContainer}>
            <View style={{ marginTop: 12 }}>
              <StarIcon size={36} />
            </View>
            <View style={{ marginTop: 0 }}>
              <StarIcon size={48} />
            </View>
            <View style={{ marginTop: 12 }}>
              <StarIcon size={36} />
            </View>
          </View>

          {/* Badge Earned Card */}
          <View style={styles.badgeCard}>
            <View style={styles.badgeLogoCircle}>
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="10" fill="#2563EB" />
                <Path d="M12 6l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4z" fill="#FEF08A" />
              </Svg>
            </View>
            <View style={styles.badgeTextGroup}>
              <Text style={styles.badgeLabel}>BADGE EARNED</Text>
              <Text style={styles.badgeTitle}>ABC Star</Text>
            </View>
          </View>

          {/* Plant Reward Showcase Card */}
          <View style={styles.plantCard}>
            <View style={styles.plantTextBubble}>
              <Text style={styles.plantText}>Your Learning Plant is growing!</Text>
            </View>
            <PottedPlantRewardIcon size={120} />
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <AppButton
            title="Next"
            variant="navy"
            iconRight={RightArrowIcon}
            onPress={onNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NurseryCelebrationScreen;
