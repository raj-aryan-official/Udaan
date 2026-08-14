import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { CelebrationModal } from '../../../components/nursery/CelebrationModal';
import { NATURE_WORLD_DATA, NatureWorldItem } from '../../../data/natureWorldData';

export interface NatureWorldExplorerScreenProps {
  onBack?: () => void;
  onRewardBonus?: (stars: number) => void;
  initialCategory?: 'animals' | 'birds' | 'fruits' | 'nature';
}

export const NatureWorldExplorerScreen: React.FC<NatureWorldExplorerScreenProps> = ({
  onBack,
  onRewardBonus,
  initialCategory = 'animals',
}) => {
  const [activeCategory, setActiveCategory] = useState<'animals' | 'birds' | 'fruits' | 'nature'>(initialCategory);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timerRef = useRef<any>(null);

  const currentList = NATURE_WORLD_DATA[activeCategory];
  const activeItem = currentList[activeItemIndex] || currentList[0];

  const handleSelectItem = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveItemIndex(index);
    const item = currentList[index];
    onRewardBonus?.(2);

    const speechText = `${item.name}! ${item.description}`;

    if (Platform.OS === 'web' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      utterance.onend = () => {
        if (isAutoPlay) {
          timerRef.current = setTimeout(() => {
            if (index + 1 < currentList.length) {
              handleSelectItem(index + 1);
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
          if (index + 1 < currentList.length) {
            handleSelectItem(index + 1);
          } else {
            setShowCelebration(true);
          }
        }, 2000);
      }
    }
  };

  const handleSwitchCategory = (cat: 'animals' | 'birds' | 'fruits' | 'nature') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveCategory(cat);
    setActiveItemIndex(0);
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
          {/* Top Title & Auto-Play Toggle */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pageTitle}>World & Nature Explorer 🌍</Text>
              <Text style={styles.pageSubtitle}>2 sec waiting time after sound completes!</Text>
            </View>

            <TouchableOpacity
              style={[styles.autoPlayBtn, isAutoPlay && styles.autoPlayActive]}
              onPress={() => setIsAutoPlay((prev) => !prev)}
            >
              <Text style={styles.autoPlayText}>{isAutoPlay ? '⏸️ Auto 2s Wait' : '▶️ Manual'}</Text>
            </TouchableOpacity>
          </View>

          {/* Category Tabs */}
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabBtn, activeCategory === 'animals' && styles.activeTabBtn]}
              onPress={() => handleSwitchCategory('animals')}
            >
              <Text style={[styles.tabText, activeCategory === 'animals' && styles.activeTabText]}>🦁 Animals</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeCategory === 'birds' && styles.activeTabBtn]}
              onPress={() => handleSwitchCategory('birds')}
            >
              <Text style={[styles.tabText, activeCategory === 'birds' && styles.activeTabText]}>🦚 Birds</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeCategory === 'fruits' && styles.activeTabBtn]}
              onPress={() => handleSwitchCategory('fruits')}
            >
              <Text style={[styles.tabText, activeCategory === 'fruits' && styles.activeTabText]}>🍎 Fruits</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeCategory === 'nature' && styles.activeTabBtn]}
              onPress={() => handleSwitchCategory('nature')}
            >
              <Text style={[styles.tabText, activeCategory === 'nature' && styles.activeTabText]}>🏔️ Nature</Text>
            </TouchableOpacity>
          </View>

          {/* Active Big Card */}
          <View style={[styles.activeCard, { borderColor: activeItem.colorHex }]}>
            <Text style={styles.bigEmoji}>{activeItem.emoji}</Text>
            <Text style={[styles.itemName, { color: activeItem.colorHex }]}>{activeItem.name}</Text>
            <Text style={styles.itemDesc}>{activeItem.description}</Text>

            <TouchableOpacity
              style={[styles.listenBtn, { backgroundColor: activeItem.colorHex }]}
              onPress={() => handleSelectItem(activeItemIndex)}
            >
              <Text style={styles.listenBtnText}>🔊 Listen Sound (2s Wait After Speech)</Text>
            </TouchableOpacity>

            <Text style={styles.funFact}>💡 {activeItem.funFact}</Text>
          </View>

          {/* Items Grid */}
          <Text style={styles.sectionHeader}>Tap Any Item to Explore!</Text>
          <View style={styles.grid}>
            {currentList.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.gridItem,
                  activeItemIndex === idx && { borderColor: item.colorHex, borderWidth: 3 },
                ]}
                onPress={() => handleSelectItem(idx)}
                activeOpacity={0.85}
              >
                <Text style={styles.gridEmoji}>{item.emoji}</Text>
                <Text style={styles.gridItemName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <CelebrationModal
        visible={showCelebration}
        onClose={() => setShowCelebration(false)}
        message={`You explored all ${activeCategory}! ⭐`}
        starsEarned={5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pageTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  pageSubtitle: { fontSize: 12, color: '#64748B', marginTop: 1 },
  autoPlayBtn: { backgroundColor: '#E2E8F0', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  autoPlayActive: { backgroundColor: '#2563EB' },
  autoPlayText: { fontSize: 12, fontWeight: '800', color: '#FFFFFF' },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 12 },
  activeTabBtn: { backgroundColor: '#2563EB' },
  tabText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  activeTabText: { color: '#FFFFFF' },
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
  bigEmoji: { fontSize: 72, marginVertical: 6 },
  itemName: { fontSize: 26, fontWeight: '900', marginBottom: 4 },
  itemDesc: { fontSize: 14, fontWeight: '600', color: '#475569', textAlign: 'center', marginBottom: 12 },
  listenBtn: {
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
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  gridEmoji: { fontSize: 36 },
  gridItemName: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginTop: 6 },
});

export default NatureWorldExplorerScreen;
