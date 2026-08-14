import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppHeader } from '../../components/common/AppHeader/AppHeader';
import { CelebrationModal } from '../../components/nursery/CelebrationModal';
import { RASPBERRY_PI_GAMES_CATALOG, RaspberryPiGameItem } from '../../data/raspberryPiGamesData';

export interface RaspberryPiGamesScreenProps {
  onBack?: () => void;
  onRewardBonus?: (stars: number) => void;
}

export const RaspberryPiGamesScreen: React.FC<RaspberryPiGamesScreenProps> = ({
  onBack,
  onRewardBonus,
}) => {
  const [activeGame, setActiveGame] = useState<RaspberryPiGameItem | null>(null);
  const [showGameModal, setShowGameModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handlePlayGame = (game: RaspberryPiGameItem) => {
    setActiveGame(game);
    setShowGameModal(true);
  };

  const handleCompleteGame = () => {
    setShowGameModal(false);
    setShowCelebration(true);
    onRewardBonus?.(10);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showLogoBadge showStarBadge starCount={120} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Title */}
          <Text style={styles.pageTitle}>Educational Games 🎮</Text>

          {/* Clean Games Grid */}
          <View style={styles.grid}>
            {RASPBERRY_PI_GAMES_CATALOG.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={[styles.gameCard, { borderColor: game.colorHex }]}
                onPress={() => handlePlayGame(game)}
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

      {/* Fullscreen Game Play Modal */}
      <Modal visible={showGameModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalGameTitle}>{activeGame?.title}</Text>
              <TouchableOpacity onPress={() => setShowGameModal(false)} style={styles.closeBtn}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Embedded Game Web Player */}
            <View style={styles.webPlayerBox}>
              {Platform.OS === 'web' && activeGame ? (
                <iframe
                  src={activeGame.playEmbedUrl}
                  title={activeGame.title}
                  style={{ width: '100%', height: 380, borderRadius: 16, border: 'none' }}
                  allowFullScreen
                />
              ) : (
                <View style={styles.nativeFallbackBox}>
                  <Text style={{ fontSize: 64 }}>{activeGame?.emoji}</Text>
                  <Text style={styles.nativeFallbackTitle}>{activeGame?.title}</Text>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.claimRewardBtn} onPress={handleCompleteGame}>
              <Text style={styles.claimRewardText}>Claim 10 Stars Reward ⭐</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message="You completed the game! 🎉"
        starsEarned={10}
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
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    maxHeight: '90%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalGameTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
  closeBtn: { padding: 4 },
  webPlayerBox: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#0F172A', marginBottom: 14 },
  nativeFallbackBox: { height: 380, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E293B' },
  nativeFallbackTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', marginTop: 10 },
  claimRewardBtn: { backgroundColor: '#F59E0B', paddingVertical: 12, borderRadius: 14, alignItems: 'center' },
  claimRewardText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});

export default RaspberryPiGamesScreen;
