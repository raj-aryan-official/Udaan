import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { BottomTabBar } from '../../../components/navigation/BottomTabBar/BottomTabBar';
import { CelebrationModal } from '../../../components/nursery/CelebrationModal';
import { RhymeData } from '../../../components/nursery/RhymePlayerModal';

export const YOUTUBE_RHYMES_CATALOG: RhymeData[] = [
  {
    id: 'rhyme-1',
    title: 'Nursery Rhyme 1',
    subtitle: 'Playable Video',
    category: 'Nursery Video',
    boxBg: '#FDE6D8',
    arrowBg: '#78350F',
    imageEmoji: '🎬',
    youtubeId: 'i35AUg11hvo',
    lyrics: [],
  },
  {
    id: 'rhyme-2',
    title: 'Nursery Rhyme 2',
    subtitle: 'Playable Video',
    category: 'Nursery Video',
    boxBg: '#FEF3C7',
    arrowBg: '#D97706',
    imageEmoji: '⭐',
    youtubeId: 'e_04ZrNroTo',
    lyrics: [],
  },
  {
    id: 'rhyme-3',
    title: 'Nursery Rhyme 3',
    subtitle: 'Playable Video',
    category: 'Nursery Video',
    boxBg: '#DCFCE7',
    arrowBg: '#15803D',
    imageEmoji: '🎵',
    youtubeId: 'EA_fbT6oN2k',
    lyrics: [],
  },
  {
    id: 'rhyme-4',
    title: 'Nursery Rhyme 4',
    subtitle: 'Playable Video',
    category: 'Nursery Video',
    boxBg: '#FCE7F3',
    arrowBg: '#DB2777',
    imageEmoji: '🎈',
    youtubeId: '1DG6UHDXQ68',
    lyrics: [],
  },
  {
    id: 'rhyme-5',
    title: 'Nursery Rhyme 5',
    subtitle: 'Playable Video',
    category: 'Nursery Video',
    boxBg: '#E0E7FF',
    arrowBg: '#1E40AF',
    imageEmoji: '🎨',
    youtubeId: 'YpPPzjSv5R8',
    lyrics: [],
  },
];

export interface RhymesActivityListScreenProps {
  onBack?: () => void;
  starCount?: number;
  onSelectRhyme?: (rhymeId: string, title: string) => void;
  onTabPress?: (tab: 'home' | 'quiz' | 'profile' | 'games') => void;
}

export const RhymesActivityListScreen: React.FC<RhymesActivityListScreenProps> = ({
  onBack,
  starCount = 120,
  onSelectRhyme,
  onTabPress,
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const handleCompleteRhyme = (id: string) => {
    setShowCelebration(true);
    onSelectRhyme?.(id, 'Nursery Video');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showLogoBadge showStarBadge starCount={starCount} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Nursery Video Songs 🎬</Text>

          <View style={styles.videoList}>
            {YOUTUBE_RHYMES_CATALOG.map((item) => (
              <View key={item.id} style={styles.videoCard}>
                {/* Playable YouTube Video Player Embed */}
                <View style={styles.playerWrapper}>
                  {Platform.OS === 'web' ? (
                    <iframe
                      width="100%"
                      height="230"
                      src={`https://www.youtube.com/embed/${item.youtubeId}?enablejsapi=1&loop=${isLooping ? 1 : 0}&playlist=${item.youtubeId}`}
                      title={item.id}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: 16 }}
                    />
                  ) : (
                    <View style={[styles.fallbackBox, { backgroundColor: item.boxBg }]}>
                      <Text style={{ fontSize: 42 }}>{item.imageEmoji}</Text>
                    </View>
                  )}
                </View>

                {/* Controls Bar */}
                <View style={styles.controlsRow}>
                  <TouchableOpacity
                    style={[styles.controlPill, isLooping && styles.activeControlPill]}
                    onPress={() => setIsLooping((prev) => !prev)}
                  >
                    <Text style={[styles.controlPillText, isLooping && styles.activeControlPillText]}>
                      🔄 {isLooping ? 'Loop ON' : 'Loop Video'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.claimBtn}
                    onPress={() => handleCompleteRhyme(item.id)}
                  >
                    <Text style={styles.claimBtnText}>Claim ⭐ Stars!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message="Great job watching the video! 🎉"
        starsEarned={5}
        plantGrew={true}
        badgeName="Rhyme Master"
      />

      <BottomTabBar activeTab="home" onTabPress={(tab) => onTabPress?.(tab)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 12 },
  pageTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 14 },
  videoList: { paddingBottom: 24 },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  playerWrapper: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000000',
    marginBottom: 10,
  },
  fallbackBox: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeControlPill: { backgroundColor: '#2563EB' },
  controlPillText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  activeControlPillText: { color: '#FFFFFF' },
  claimBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
  },
  claimBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
});

export default RhymesActivityListScreen;
