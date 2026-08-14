import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import {
  AppleStickerIcon,
  CatStickerIcon,
  SunStickerIcon,
  BirdStickerIcon,
} from '../../../components/common/Illustrations';

export interface StickerCollectionScreenProps {
  onBack?: () => void;
}

export const StickerCollectionScreen: React.FC<StickerCollectionScreenProps> = ({ onBack }) => {
  const stickers = [
    { id: 'apple', title: 'Golden Apple', icon: <AppleStickerIcon size={44} />, unlocked: true },
    { id: 'cat', title: 'Smart Kitty', icon: <CatStickerIcon size={44} />, unlocked: true },
    { id: 'sun', title: 'Bright Sun', icon: <SunStickerIcon size={48} />, unlocked: true },
    { id: 'bird', title: 'Super Bird', icon: <BirdStickerIcon size={44} />, unlocked: true },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showStarBadge starCount={120} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Your Reward Stickers</Text>
          <Text style={styles.subtitle}>Complete lessons to collect magical stickers!</Text>
        </View>

        <View style={styles.grid}>
          {stickers.map((sticker) => (
            <View key={sticker.id} style={styles.card}>
              <View style={styles.iconCircle}>{sticker.icon}</View>
              <Text style={styles.stickerTitle}>{sticker.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { padding: 20 },
  headerText: { marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: '#1E293B' },
  subtitle: { fontSize: 14, color: '#64748B', marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  stickerTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
});

export default StickerCollectionScreen;
