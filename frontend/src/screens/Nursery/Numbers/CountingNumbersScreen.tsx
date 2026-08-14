import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { CelebrationModal } from '../../../components/nursery/CelebrationModal';

export interface NumberItem {
  num: number;
  word: string;
  emoji: string;
  objName: string;
  colorHex: string;
}

export const NUMBERS_DATA: NumberItem[] = [
  { num: 1, word: 'One', emoji: '🍎', objName: 'Apple', colorHex: '#EF4444' },
  { num: 2, word: 'Two', emoji: '🐥', objName: 'Chicks', colorHex: '#F59E0B' },
  { num: 3, word: 'Three', emoji: '🎈', objName: 'Balloons', colorHex: '#10B981' },
  { num: 4, word: 'Four', emoji: '⭐️', objName: 'Stars', colorHex: '#EAB308' },
  { num: 5, word: 'Five', emoji: '🚗', objName: 'Cars', colorHex: '#3B82F6' },
  { num: 6, word: 'Six', emoji: '🐱', objName: 'Kittens', colorHex: '#8B5CF6' },
  { num: 7, word: 'Seven', emoji: '🌸', objName: 'Flowers', colorHex: '#EC4899' },
  { num: 8, word: 'Eight', emoji: '⚽', objName: 'Soccer Balls', colorHex: '#14B8A6' },
  { num: 9, word: 'Nine', emoji: '🎁', objName: 'Gifts', colorHex: '#F97316' },
  { num: 10, word: 'Ten', emoji: '🍦', objName: 'Ice Creams', colorHex: '#6366F1' },
];

export interface CountingNumbersScreenProps {
  onBack?: () => void;
  onRewardBonus?: (stars: number) => void;
}

export const CountingNumbersScreen: React.FC<CountingNumbersScreenProps> = ({
  onBack,
  onRewardBonus,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timerRef = useRef<any>(null);

  const activeItem = NUMBERS_DATA[activeItemIndex];

  const handleSelectNumber = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveItemIndex(index);
    const item = NUMBERS_DATA[index];
    onRewardBonus?.(1);

    const speechText = `${item.word}! ${item.num} ${item.objName}!`;

    if (Platform.OS === 'web' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      utterance.onend = () => {
        if (isAutoPlay) {
          timerRef.current = setTimeout(() => {
            if (index + 1 < NUMBERS_DATA.length) {
              handleSelectNumber(index + 1);
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
          if (index + 1 < NUMBERS_DATA.length) {
            handleSelectNumber(index + 1);
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

  const renderEmojiArray = (item: NumberItem) => {
    const emojis = [];
    for (let i = 0; i < item.num; i++) {
      emojis.push(
        <Text key={i} style={styles.countEmojiItem}>
          {item.emoji}
        </Text>
      );
    }
    return emojis;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showLogoBadge showStarBadge starCount={120} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pageTitle}>Count Numbers 1 to 10 🔢</Text>
              <Text style={styles.pageSubtitle}>2 sec waiting time after sound completes!</Text>
            </View>

            <TouchableOpacity
              style={[styles.autoPlayBtn, isAutoPlay && styles.autoPlayActive]}
              onPress={() => setIsAutoPlay((prev) => !prev)}
            >
              <Text style={styles.autoPlayText}>{isAutoPlay ? '⏸️ Auto 2s Wait' : '▶️ Manual'}</Text>
            </TouchableOpacity>
          </View>

          {/* Active Big Number Card */}
          <View style={[styles.activeCard, { borderColor: activeItem.colorHex }]}>
            <Text style={[styles.bigNumText, { color: activeItem.colorHex }]}>{activeItem.num}</Text>
            <Text style={styles.wordTitle}>{activeItem.word} {activeItem.objName}</Text>

            {/* Render Objects Array */}
            <View style={styles.objectsGrid}>
              {renderEmojiArray(activeItem)}
            </View>

            <TouchableOpacity
              style={[styles.listenBtn, { backgroundColor: activeItem.colorHex }]}
              onPress={() => handleSelectNumber(activeItemIndex)}
            >
              <Text style={styles.listenBtnText}>🔊 Count Aloud (2s Wait After Speech)</Text>
            </TouchableOpacity>
          </View>

          {/* 1 to 10 Numbers Grid */}
          <Text style={styles.sectionHeader}>Select Number (1 to 10)</Text>

          <View style={styles.grid}>
            {NUMBERS_DATA.map((item, idx) => (
              <TouchableOpacity
                key={item.num}
                style={[
                  styles.gridItem,
                  activeItemIndex === idx && { borderColor: item.colorHex, borderWidth: 3 },
                ]}
                onPress={() => handleSelectNumber(idx)}
                activeOpacity={0.85}
              >
                <Text style={[styles.gridNum, { color: item.colorHex }]}>{item.num}</Text>
                <Text style={styles.gridEmoji}>{item.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message="You counted from 1 to 10! 🎉"
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
    marginBottom: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  bigNumText: { fontSize: 60, fontWeight: '900', marginBottom: 2 },
  wordTitle: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 10 },
  objectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  countEmojiItem: { fontSize: 32, margin: 4 },
  listenBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    marginTop: 8,
  },
  listenBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  sectionHeader: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: {
    width: '18%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  gridNum: { fontSize: 20, fontWeight: '900' },
  gridEmoji: { fontSize: 18, marginTop: 2 },
});

export default CountingNumbersScreen;
