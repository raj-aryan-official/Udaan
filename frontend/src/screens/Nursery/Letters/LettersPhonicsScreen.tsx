import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { CelebrationModal } from '../../../components/nursery/CelebrationModal';

export interface LetterItem {
  letter: string;
  word: string;
  emoji: string;
  phonicSound: string;
  colorHex: string;
}

export const ALPHABET_DATA: LetterItem[] = [
  { letter: 'A', word: 'Apple', emoji: '🍎', phonicSound: '/æ/ as in Apple', colorHex: '#EF4444' },
  { letter: 'B', word: 'Ball', emoji: '⚽', phonicSound: '/b/ as in Ball', colorHex: '#3B82F6' },
  { letter: 'C', word: 'Cat', emoji: '🐱', phonicSound: '/k/ as in Cat', colorHex: '#10B981' },
  { letter: 'D', word: 'Dog', emoji: '🐶', phonicSound: '/d/ as in Dog', colorHex: '#F59E0B' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', phonicSound: '/e/ as in Elephant', colorHex: '#8B5CF6' },
  { letter: 'F', word: 'Fish', emoji: '🐟', phonicSound: '/f/ as in Fish', colorHex: '#EC4899' },
  { letter: 'G', word: 'Grapes', emoji: '🍇', phonicSound: '/g/ as in Grapes', colorHex: '#9333EA' },
  { letter: 'H', word: 'Hat', emoji: '🎩', phonicSound: '/h/ as in Hat', colorHex: '#F97316' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', phonicSound: '/aɪ/ as in Ice Cream', colorHex: '#06B6D4' },
  { letter: 'J', word: 'Juice', emoji: '🧃', phonicSound: '/dʒ/ as in Juice', colorHex: '#EAB308' },
  { letter: 'K', word: 'Kite', emoji: '🪁', phonicSound: '/k/ as in Kite', colorHex: '#84CC16' },
  { letter: 'L', word: 'Lion', emoji: '🦁', phonicSound: '/l/ as in Lion', colorHex: '#D97706' },
  { letter: 'M', word: 'Monkey', emoji: '🐵', phonicSound: '/m/ as in Monkey', colorHex: '#78350F' },
  { letter: 'N', word: 'Nest', emoji: '🪹', phonicSound: '/n/ as in Nest', colorHex: '#475569' },
  { letter: 'O', word: 'Orange', emoji: '🍊', phonicSound: '/ɒ/ as in Orange', colorHex: '#EA580C' },
  { letter: 'P', word: 'Parrot', emoji: '🦜', phonicSound: '/p/ as in Parrot', colorHex: '#16A34A' },
  { letter: 'Q', word: 'Queen', emoji: '👑', phonicSound: '/kw/ as in Queen', colorHex: '#C026D3' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰', phonicSound: '/r/ as in Rabbit', colorHex: '#DB2777' },
  { letter: 'S', word: 'Sun', emoji: '☀️', phonicSound: '/s/ as in Sun', colorHex: '#CA8A04' },
  { letter: 'T', word: 'Tiger', emoji: '🐯', phonicSound: '/t/ as in Tiger', colorHex: '#D97706' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', phonicSound: '/ʌ/ as in Umbrella', colorHex: '#0284C7' },
  { letter: 'V', word: 'Violin', emoji: '🎻', phonicSound: '/v/ as in Violin', colorHex: '#7C3AED' },
  { letter: 'W', word: 'Watch', emoji: '⌚', phonicSound: '/w/ as in Watch', colorHex: '#475569' },
  { letter: 'X', word: 'Xylophone', emoji: '🎼', phonicSound: '/z/ as in Xylophone', colorHex: '#E11D48' },
  { letter: 'Y', word: 'Yak', emoji: '🐂', phonicSound: '/j/ as in Yak', colorHex: '#65A30D' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', phonicSound: '/z/ as in Zebra', colorHex: '#0F172A' },
];

export interface LettersPhonicsScreenProps {
  onBack?: () => void;
  onRewardBonus?: (stars: number) => void;
}

export const LettersPhonicsScreen: React.FC<LettersPhonicsScreenProps> = ({
  onBack,
  onRewardBonus,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timerRef = useRef<any>(null);

  const activeItem = ALPHABET_DATA[activeItemIndex];

  const handleSelectLetter = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveItemIndex(index);
    const item = ALPHABET_DATA[index];
    onRewardBonus?.(1);

    const speechText = `${item.letter}! ${item.letter} is for ${item.word}!`;

    if (Platform.OS === 'web' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      utterance.onend = () => {
        if (isAutoPlay) {
          timerRef.current = setTimeout(() => {
            if (index + 1 < ALPHABET_DATA.length) {
              handleSelectLetter(index + 1);
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
          if (index + 1 < ALPHABET_DATA.length) {
            handleSelectLetter(index + 1);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showLogoBadge showStarBadge starCount={120} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pageTitle}>ABC Letters & Phonics 🔤</Text>
              <Text style={styles.pageSubtitle}>2 sec waiting time after sound completes!</Text>
            </View>

            <TouchableOpacity
              style={[styles.autoPlayBtn, isAutoPlay && styles.autoPlayActive]}
              onPress={() => setIsAutoPlay((prev) => !prev)}
            >
              <Text style={styles.autoPlayText}>{isAutoPlay ? '⏸️ Auto 2s Wait' : '▶️ Manual'}</Text>
            </TouchableOpacity>
          </View>

          {/* Active Big Letter Display Card */}
          <View style={[styles.activeCard, { borderColor: activeItem.colorHex }]}>
            <Text style={[styles.bigLetter, { color: activeItem.colorHex }]}>
              {activeItem.letter} {activeItem.letter.toLowerCase()}
            </Text>

            <Text style={styles.emojiDisplay}>{activeItem.emoji}</Text>
            <Text style={styles.wordTitle}>{activeItem.letter} is for {activeItem.word}</Text>
            <Text style={styles.phonicText}>🔊 Phonic Sound: {activeItem.phonicSound}</Text>

            <TouchableOpacity
              style={[styles.listenBtn, { backgroundColor: activeItem.colorHex }]}
              onPress={() => handleSelectLetter(activeItemIndex)}
            >
              <Text style={styles.listenBtnText}>🔊 Listen Sound (2s Wait After Speech)</Text>
            </TouchableOpacity>
          </View>

          {/* A-Z Grid */}
          <Text style={styles.sectionHeader}>Alphabet Cards (A to Z)</Text>
          <View style={styles.grid}>
            {ALPHABET_DATA.map((item, idx) => (
              <TouchableOpacity
                key={item.letter}
                style={[
                  styles.gridItem,
                  activeItemIndex === idx && { borderColor: item.colorHex, borderWidth: 3 },
                ]}
                onPress={() => handleSelectLetter(idx)}
                activeOpacity={0.85}
              >
                <Text style={[styles.gridLetter, { color: item.colorHex }]}>{item.letter}</Text>
                <Text style={styles.gridEmoji}>{item.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message="Great job practicing all Phonics A-Z! ⭐"
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
  bigLetter: { fontSize: 44, fontWeight: '900', marginBottom: 4 },
  emojiDisplay: { fontSize: 64, marginVertical: 8 },
  wordTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  phonicText: { fontSize: 13, fontWeight: '600', color: '#64748B', marginBottom: 12 },
  listenBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
  },
  listenBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  sectionHeader: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  gridLetter: { fontSize: 20, fontWeight: '900' },
  gridEmoji: { fontSize: 20, marginTop: 4 },
});

export default LettersPhonicsScreen;
