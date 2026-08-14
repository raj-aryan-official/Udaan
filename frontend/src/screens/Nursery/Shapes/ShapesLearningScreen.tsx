import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Svg, { Circle, Rect, Polygon, Path } from 'react-native-svg';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { CelebrationModal } from '../../../components/nursery/CelebrationModal';
import { NURSERY_SHAPES_DATA, ShapeItem } from '../../../data/shapesData';

export interface ShapesLearningScreenProps {
  onBack?: () => void;
  onRewardBonus?: (stars: number) => void;
}

export const ShapesLearningScreen: React.FC<ShapesLearningScreenProps> = ({
  onBack,
  onRewardBonus,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timerRef = useRef<any>(null);

  const activeShape = NURSERY_SHAPES_DATA[activeItemIndex];

  const handleSelectShape = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveItemIndex(index);
    const shape = NURSERY_SHAPES_DATA[index];
    onRewardBonus?.(2);

    const speechText = `${shape.name}! ${shape.description}`;

    if (Platform.OS === 'web' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      utterance.onend = () => {
        if (isAutoPlay) {
          timerRef.current = setTimeout(() => {
            if (index + 1 < NURSERY_SHAPES_DATA.length) {
              handleSelectShape(index + 1);
            } else {
              setShowCelebration(true);
            }
          }, 2000);
        }
      };

      window.speechSynthesis.speak(utterance);
    } else {
      if (isAutoPlay) {
        timerRef.current = setTimeout(() => {
          if (index + 1 < NURSERY_SHAPES_DATA.length) {
            handleSelectShape(index + 1);
          } else {
            setShowCelebration(true);
          }
        }, 2000);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const renderShapeSvg = (svgType: string, colorHex: string, size: number = 90) => {
    switch (svgType) {
      case 'circle':
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="42" fill={colorHex} />
          </Svg>
        );
      case 'square':
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Rect x="12" y="12" width="76" height="76" rx="8" fill={colorHex} />
          </Svg>
        );
      case 'triangle':
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Polygon points="50,10 90,88 10,88" fill={colorHex} />
          </Svg>
        );
      case 'star':
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Polygon points="50,8 63,35 93,38 71,59 78,89 50,73 22,89 29,59 7,38 37,35" fill={colorHex} />
          </Svg>
        );
      case 'rectangle':
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Rect x="8" y="24" width="84" height="52" rx="8" fill={colorHex} />
          </Svg>
        );
      case 'heart':
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Path
              d="M50 88s-36-22-36-46c0-13 10-22 22-22 8 0 14 4 14 4s6-4 14-4c12 0 22 9 22 22 0 24-36 46-36 46z"
              fill={colorHex}
            />
          </Svg>
        );
      case 'diamond':
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Polygon points="50,8 88,50 50,92 12,50" fill={colorHex} />
          </Svg>
        );
      case 'oval':
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="42" fill={colorHex} transform="scale(1, 0.7) translate(0, 20)" />
          </Svg>
        );
      case 'pentagon':
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Polygon points="50,8 90,38 74,88 26,88 10,38" fill={colorHex} />
          </Svg>
        );
      case 'hexagon':
      default:
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100">
            <Polygon points="50,8 88,28 88,72 50,92 12,72 12,28" fill={colorHex} />
          </Svg>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showLogoBadge showStarBadge starCount={120} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pageTitle}>Interactive Shapes & Colors 🎨</Text>
              <Text style={styles.pageSubtitle}>2 sec waiting time after sound completes!</Text>
            </View>

            <TouchableOpacity
              style={[styles.autoPlayBtn, isAutoPlay && styles.autoPlayActive]}
              onPress={() => setIsAutoPlay((prev) => !prev)}
            >
              <Text style={styles.autoPlayText}>{isAutoPlay ? '⏸️ Auto 2s Wait' : '▶️ Manual'}</Text>
            </TouchableOpacity>
          </View>

          {/* Active Big Shape Card */}
          <View style={[styles.activeCard, { borderColor: activeShape.colorHex }]}>
            <View style={styles.shapeDisplayArea}>
              {renderShapeSvg(activeShape.svgType, activeShape.colorHex, 130)}
            </View>

            <Text style={[styles.shapeName, { color: activeShape.colorHex }]}>{activeShape.name}</Text>
            <Text style={styles.shapeDesc}>{activeShape.description}</Text>

            <View style={styles.detailsRow}>
              <View style={styles.detailPill}>
                <Text style={styles.detailText}>📐 Sides: {activeShape.sides}</Text>
              </View>
              <View style={styles.detailPill}>
                <Text style={styles.detailText}>🎨 Color: {activeShape.color_suggestion}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.listenBtn}
              onPress={() => handleSelectShape(activeItemIndex)}
            >
              <Text style={styles.listenBtnText}>🔊 Listen Sound (2s Wait After Speech)</Text>
            </TouchableOpacity>

            <Text style={styles.funFact}>💡 {activeShape.funFact}</Text>
          </View>

          {/* Shape Selection Grid */}
          <Text style={styles.sectionHeader}>Tap a Shape to Learn!</Text>

          <View style={styles.grid}>
            {NURSERY_SHAPES_DATA.map((shape, idx) => (
              <TouchableOpacity
                key={shape.id}
                style={[
                  styles.gridItem,
                  activeItemIndex === idx && { borderColor: shape.colorHex, borderWidth: 3 },
                ]}
                onPress={() => handleSelectShape(idx)}
                activeOpacity={0.85}
              >
                {renderShapeSvg(shape.svgType, shape.colorHex, 54)}
                <Text style={styles.gridItemName}>{shape.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message="You learned all 10 shapes! ⭐"
        starsEarned={5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  pageTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  pageSubtitle: { fontSize: 12, color: '#64748B', marginTop: 1 },
  autoPlayBtn: { backgroundColor: '#E2E8F0', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  autoPlayActive: { backgroundColor: '#2563EB' },
  autoPlayText: { fontSize: 12, fontWeight: '800', color: '#FFFFFF' },
  activeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 3,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  shapeDisplayArea: { marginVertical: 14, alignItems: 'center', justifyContent: 'center' },
  shapeName: { fontSize: 28, fontWeight: '900', marginBottom: 6 },
  shapeDesc: { fontSize: 14, fontWeight: '600', color: '#475569', textAlign: 'center', marginBottom: 12 },
  detailsRow: { flexDirection: 'row', marginBottom: 14 },
  detailPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  detailText: { fontSize: 13, fontWeight: '700', color: '#334155' },
  listenBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 10,
  },
  listenBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  funFact: { fontSize: 12, fontWeight: '600', color: '#64748B', textAlign: 'center' },
  sectionHeader: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  gridItemName: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginTop: 8 },
});

export default ShapesLearningScreen;
