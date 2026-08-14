import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Svg, { Circle, Path, G, Rect, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const officialLogoSource = require('../../../assets/logo.png');

// 1. Official App Emblem Logo (उड़ान)
export const UdaanLogoEmblem: React.FC<{ size?: number }> = ({ size = 110 }) => {
  return (
    <View style={[styles.emblemContainer, { width: size, height: size }]}>
      <Image
        source={officialLogoSource}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="contain"
      />
    </View>
  );
};

// 2. Bunny Logo Badge (Header & Modals)
export const BunnyLogoBadge: React.FC<{ size?: number }> = ({ size = 64 }) => {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', borderWidth: 2, borderColor: '#3B82F6' }}>
      <Image
        source={officialLogoSource}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

// 3. Cute Bird Phone Character (OTP Screen)
export const BirdPhoneCharacter: React.FC<{ size?: number }> = ({ size = 120 }) => {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', borderWidth: 3, borderColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={officialLogoSource}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

// 4. Tiger Avatar Badge (Class Setup Screen)
export const TigerAvatar: React.FC<{ size?: number }> = ({ size = 72 }) => {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#FEF3C7', borderWidth: 3, borderColor: '#F59E0B', alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size * 0.75} height={size * 0.75} viewBox="0 0 60 60" fill="none">
        <Circle cx="14" cy="16" r="8" fill="#F59E0B" />
        <Circle cx="14" cy="16" r="4" fill="#FEF08A" />
        <Circle cx="46" cy="16" r="8" fill="#F59E0B" />
        <Circle cx="46" cy="16" r="4" fill="#FEF08A" />
        <Circle cx="30" cy="32" r="22" fill="#F59E0B" />
        <Circle cx="24" cy="38" r="8" fill="#FFFFFF" />
        <Circle cx="36" cy="38" r="8" fill="#FFFFFF" />
        <Circle cx="22" cy="28" r="3" fill="#1E293B" />
        <Circle cx="38" cy="28" r="3" fill="#1E293B" />
        <Circle cx="23" cy="27" r="1" fill="#FFFFFF" />
        <Circle cx="39" cy="27" r="1" fill="#FFFFFF" />
        <Path d="M 28 35 L 32 35 L 30 38 Z" fill="#1E293B" />
        <Path d="M 30 12 L 30 18 M 24 14 L 26 18 M 36 14 L 34 18" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        <Path d="M 12 30 L 17 30 M 48 30 L 43 30" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      </Svg>
    </View>
  );
};

// 5. Nursery Hero Bird Character (Hello, Friend! Let's play.)
export const NurseryBirdHeroAvatar: React.FC<{ size?: number }> = ({ size = 130 }) => {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#FFFFFF', borderWidth: 4, borderColor: '#2563EB', overflow: 'hidden', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10 }}>
      <Image
        source={officialLogoSource}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

// 6. Nursery Category Badges (Letters, Numbers, Shapes)
export const LettersIconBadge: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#FDE6D8', alignItems: 'center', justifyContent: 'center' }}>
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <SvgText x="12" y="17" fontSize="14" fontWeight="bold" fill="#C96525" textAnchor="middle" fontFamily="System">
        Aᶻ
      </SvgText>
    </Svg>
  </View>
);

export const NumbersIconBadge: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#E0E7FF', alignItems: 'center', justifyContent: 'center' }}>
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <SvgText x="12" y="17" fontSize="13" fontWeight="bold" fill="#1E40AF" textAnchor="middle" fontFamily="System">
        123
      </SvgText>
    </Svg>
  </View>
);

export const ShapesIconBadge: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center' }}>
    <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <Path d="M12 3L4 17H20L12 3Z" fill="#B45309" />
      <Circle cx="12" cy="18" r="2.5" fill="#D97706" />
    </Svg>
  </View>
);

export const AppleStickerIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <Text style={{ fontSize: size * 0.7 }}>🍎</Text>
);

export const CatStickerIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <Text style={{ fontSize: size * 0.7 }}>🐱</Text>
);

export const SunStickerIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <Text style={{ fontSize: size * 0.7 }}>☀️</Text>
);

export const BirdStickerIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <Text style={{ fontSize: size * 0.7 }}>🦚</Text>
);

export const PottedPlantRewardIcon: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <Text style={{ fontSize: size * 0.7 }}>🪴</Text>
);

export const CarCategoryIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Text style={{ fontSize: size * 0.7 }}>🚗</Text>
);

export const BookCategoryIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Text style={{ fontSize: size * 0.7 }}>📚</Text>
);

export const FlaskCategoryIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Text style={{ fontSize: size * 0.7 }}>🧪</Text>
);

export const LaptopCategoryIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Text style={{ fontSize: size * 0.7 }}>💻</Text>
);

export const CarBadgeIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Text style={{ fontSize: size * 0.7 }}>🚗</Text>
);

export const PencilBadgeIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Text style={{ fontSize: size * 0.7 }}>✏️</Text>
);

export const BookBadgeIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <Text style={{ fontSize: size * 0.7 }}>📖</Text>
);

const styles = StyleSheet.create({
  emblemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
