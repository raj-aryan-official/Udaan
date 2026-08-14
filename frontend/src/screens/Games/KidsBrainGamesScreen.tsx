import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppHeader } from '../../components/common/AppHeader/AppHeader';
import { CelebrationModal } from '../../components/nursery/CelebrationModal';

export interface BrainGameDef {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  colorHex: string;
  badge: string;
}

export const BRAIN_GAMES_LIST: BrainGameDef[] = [
  { id: 'color-match', title: 'Color Matcher 🎨', subtitle: 'Tap the matching color!', emoji: '🎨', colorHex: '#3B82F6', badge: 'Brain Power' },
  { id: 'memory-pair', title: 'Memory Cards 🧩', subtitle: 'Find matching twin cards!', emoji: '🧩', colorHex: '#10B981', badge: 'Memory Boost' },
  { id: 'balloon-pop', title: 'Pop Number Balloons 🎈', subtitle: 'Pop balloon numbers 1 to 5!', emoji: '🎈', colorHex: '#F59E0B', badge: 'Focus Game' },
  { id: 'animal-quiz', title: 'Animal Sound Quiz 🐶', subtitle: 'Who makes this sound?', emoji: '🐶', colorHex: '#8B5CF6', badge: 'Logic Skill' },
];

export interface KidsBrainGamesScreenProps {
  onBack?: () => void;
  onRewardBonus?: (stars: number) => void;
}

export const KidsBrainGamesScreen: React.FC<KidsBrainGamesScreenProps> = ({
  onBack,
  onRewardBonus,
}) => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState('');

  // Game 1: Color Matcher State
  const colorOptions = [
    { name: 'Red', hex: '#EF4444', emoji: '🍎' },
    { name: 'Blue', hex: '#3B82F6', emoji: '🚙' },
    { name: 'Green', hex: '#10B981', emoji: '🐸' },
    { name: 'Yellow', hex: '#EAB308', emoji: '☀️' },
  ];
  const [colorTarget, setColorTarget] = useState(colorOptions[0]);
  const [colorScore, setColorScore] = useState(0);

  // Game 2: Memory Pair State
  const memoryCardsInit = [
    { id: 1, emoji: '⭐', flipped: false, matched: false },
    { id: 2, emoji: '🍎', flipped: false, matched: false },
    { id: 3, emoji: '⭐', flipped: false, matched: false },
    { id: 4, emoji: '🍎', flipped: false, matched: false },
  ];
  const [memoryCards, setMemoryCards] = useState(memoryCardsInit);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // Game 3: Balloon Pop State
  const [targetNum, setTargetNum] = useState(3);
  const [poppedCount, setPoppedCount] = useState(0);

  // Game 4: Animal Sound Quiz State
  const animalQuestions = [
    { prompt: 'Who says Woof Woof?', correct: 'Dog 🐶', options: ['Cat 🐱', 'Dog 🐶', 'Cow 🐄'] },
    { prompt: 'Who says Meow Meow?', correct: 'Cat 🐱', options: ['Dog 🐶', 'Cat 🐱', 'Duck 🦆'] },
    { prompt: 'Who says Moo Moo?', correct: 'Cow 🐄', options: ['Cow 🐄', 'Lion 🦁', 'Bear 🐻'] },
  ];
  const [animalIdx, setAnimalIdx] = useState(0);

  const speakText = (text: string) => {
    if (Platform.OS === 'web' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLaunchGame = (gameId: string) => {
    setActiveGameId(gameId);
    if (gameId === 'color-match') {
      const rand = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      setColorTarget(rand);
      speakText(`Tap the ${rand.name} item!`);
    } else if (gameId === 'balloon-pop') {
      const num = Math.floor(Math.random() * 5) + 1;
      setTargetNum(num);
      speakText(`Pop balloon number ${num}!`);
    } else if (gameId === 'animal-quiz') {
      speakText(animalQuestions[0].prompt);
    }
  };

  // Color match handler
  const handleColorTap = (option: typeof colorOptions[0]) => {
    if (option.name === colorTarget.name) {
      speakText(`Great job! That is ${option.name}!`);
      setColorScore((prev) => prev + 1);
      onRewardBonus?.(2);
      if (colorScore + 1 >= 3) {
        setCelebrationMsg('Brain Master! You matched all colors! 🎨⭐');
        setShowCelebration(true);
        setActiveGameId(null);
        setColorScore(0);
      } else {
        const rand = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        setColorTarget(rand);
        setTimeout(() => speakText(`Tap the ${rand.name} item!`), 1000);
      }
    } else {
      speakText(`Try again! Tap ${colorTarget.name}`);
    }
  };

  // Memory card handler
  const handleMemoryCardTap = (index: number) => {
    if (memoryCards[index].flipped || memoryCards[index].matched || selectedCards.length === 2) return;

    const nextCards = [...memoryCards];
    nextCards[index].flipped = true;
    setMemoryCards(nextCards);

    const nextSelected = [...selectedCards, index];
    setSelectedCards(nextSelected);

    if (nextSelected.length === 2) {
      const [first, second] = nextSelected;
      if (nextCards[first].emoji === nextCards[second].emoji) {
        nextCards[first].matched = true;
        nextCards[second].matched = true;
        setMemoryCards(nextCards);
        setSelectedCards([]);
        speakText('Match found! Great memory!');
        onRewardBonus?.(5);

        if (nextCards.every((c) => c.matched)) {
          setTimeout(() => {
            setCelebrationMsg('Awesome Memory! You matched all pair cards! 🧩⭐');
            setShowCelebration(true);
            setActiveGameId(null);
            setMemoryCards(memoryCardsInit);
          }, 800);
        }
      } else {
        setTimeout(() => {
          nextCards[first].flipped = false;
          nextCards[second].flipped = false;
          setMemoryCards(nextCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // Balloon pop handler
  const handlePopBalloon = (num: number) => {
    if (num === targetNum) {
      speakText(`Pop! Number ${num}!`);
      const nextCount = poppedCount + 1;
      setPoppedCount(nextCount);
      onRewardBonus?.(2);

      if (nextCount >= 3) {
        setCelebrationMsg('Pop Star! You popped all number balloons! 🎈⭐');
        setShowCelebration(true);
        setActiveGameId(null);
        setPoppedCount(0);
      } else {
        const nextTarget = Math.floor(Math.random() * 5) + 1;
        setTargetNum(nextTarget);
        setTimeout(() => speakText(`Pop balloon number ${nextTarget}!`), 800);
      }
    } else {
      speakText(`Pop balloon ${targetNum}!`);
    }
  };

  // Animal quiz handler
  const handleAnimalAnswer = (ans: string) => {
    const currentQ = animalQuestions[animalIdx];
    if (ans === currentQ.correct) {
      speakText('Correct! Wonderful!');
      onRewardBonus?.(3);

      if (animalIdx + 1 < animalQuestions.length) {
        setAnimalIdx((prev) => prev + 1);
        setTimeout(() => speakText(animalQuestions[animalIdx + 1].prompt), 1000);
      } else {
        setCelebrationMsg('Animal Expert! You answered all sound questions! 🐶⭐');
        setShowCelebration(true);
        setActiveGameId(null);
        setAnimalIdx(0);
      }
    } else {
      speakText('Try again!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showLogoBadge showStarBadge starCount={120} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Brain Boosting Kids Games 🧠</Text>

          {/* Simple Brain Games List */}
          <View style={styles.grid}>
            {BRAIN_GAMES_LIST.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={[styles.gameCard, { borderColor: game.colorHex }]}
                onPress={() => handleLaunchGame(game.id)}
                activeOpacity={0.85}
              >
                <Text style={styles.gameEmoji}>{game.emoji}</Text>
                <Text style={styles.gameTitle}>{game.title}</Text>

                <View style={[styles.playBtn, { backgroundColor: game.colorHex }]}>
                  <Text style={styles.playBtnText}>▶️ Play Game</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Game 1: Color Matcher Modal */}
      <Modal visible={activeGameId === 'color-match'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalGameTitle}>🎨 Color Matcher</Text>
              <TouchableOpacity onPress={() => setActiveGameId(null)} style={styles.closeBtn}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>

            <View style={styles.gameBody}>
              <Text style={styles.promptText}>Find the <Text style={{ color: colorTarget.hex, fontWeight: '900' }}>{colorTarget.name}</Text> Item!</Text>

              <View style={styles.colorOptionsGrid}>
                {colorOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt.name}
                    style={[styles.colorBox, { backgroundColor: opt.hex }]}
                    onPress={() => handleColorTap(opt)}
                  >
                    <Text style={{ fontSize: 48 }}>{opt.emoji}</Text>
                    <Text style={styles.colorNameText}>{opt.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Game 2: Memory Pair Cards Modal */}
      <Modal visible={activeGameId === 'memory-pair'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalGameTitle}>🧩 Memory Match Cards</Text>
              <TouchableOpacity onPress={() => setActiveGameId(null)} style={styles.closeBtn}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>

            <View style={styles.gameBody}>
              <Text style={styles.promptText}>Tap 2 cards to find twin pairs!</Text>
              <View style={styles.memoryGrid}>
                {memoryCards.map((card, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.memoryCardBox, card.flipped || card.matched ? styles.memoryCardFlipped : null]}
                    onPress={() => handleMemoryCardTap(idx)}
                  >
                    <Text style={{ fontSize: 44 }}>
                      {card.flipped || card.matched ? card.emoji : '❓'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Game 3: Pop Number Balloons Modal */}
      <Modal visible={activeGameId === 'balloon-pop'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalGameTitle}>🎈 Pop Balloon #{targetNum}</Text>
              <TouchableOpacity onPress={() => setActiveGameId(null)} style={styles.closeBtn}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>

            <View style={styles.gameBody}>
              <Text style={styles.promptText}>Pop Balloon Number <Text style={{ color: '#F59E0B', fontWeight: '900' }}>#{targetNum}</Text>!</Text>
              <View style={styles.balloonsRow}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.balloonItem}
                    onPress={() => handlePopBalloon(num)}
                  >
                    <Text style={{ fontSize: 44 }}>🎈</Text>
                    <Text style={styles.balloonNumText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Game 4: Animal Sound Quiz Modal */}
      <Modal visible={activeGameId === 'animal-quiz'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalGameTitle}>🐶 Animal Sound Quiz</Text>
              <TouchableOpacity onPress={() => setActiveGameId(null)} style={styles.closeBtn}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>

            <View style={styles.gameBody}>
              <Text style={styles.promptText}>{animalQuestions[animalIdx].prompt}</Text>
              <View style={styles.quizOptionsList}>
                {animalQuestions[animalIdx].options.map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={styles.quizOptBtn}
                    onPress={() => handleAnimalAnswer(opt)}
                  >
                    <Text style={styles.quizOptText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message={celebrationMsg || 'Great brain development game! 🎉'}
        starsEarned={5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 12 },
  pageTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gameCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  gameEmoji: { fontSize: 48, marginVertical: 6 },
  gameTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B', marginBottom: 10, textAlign: 'center' },
  playBtn: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 14, width: '100%', alignItems: 'center' },
  playBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  modalGameTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
  closeBtn: { padding: 4 },
  gameBody: { alignItems: 'center', paddingVertical: 8 },
  promptText: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginBottom: 16, textAlign: 'center' },
  colorOptionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  colorBox: { width: '48%', borderRadius: 18, padding: 16, alignItems: 'center', marginBottom: 12 },
  colorNameText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', marginTop: 4 },
  memoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  memoryCardBox: {
    width: '48%',
    height: 100,
    backgroundColor: '#E2E8F0',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
  },
  memoryCardFlipped: { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' },
  balloonsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  balloonItem: { alignItems: 'center', margin: 10 },
  balloonNumText: { fontSize: 18, fontWeight: '900', color: '#1E293B', marginTop: -10 },
  quizOptionsList: { width: '100%' },
  quizOptBtn: { backgroundColor: '#EFF6FF', borderRadius: 16, padding: 14, marginBottom: 10, alignItems: 'center', borderWidth: 2, borderColor: '#3B82F6' },
  quizOptText: { fontSize: 16, fontWeight: '800', color: '#1E40AF' },
});

export default KidsBrainGamesScreen;
