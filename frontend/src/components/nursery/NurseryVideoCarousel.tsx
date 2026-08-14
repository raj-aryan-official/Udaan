import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { RhymePlayerModal, RhymeData } from './RhymePlayerModal';

export interface CarouselVideoItem {
  id: string;
  youtubeId: string;
  title: string;
  badge: string;
  subtitle: string;
  colorHex: string;
}

export const CAROUSEL_RHYMES_VIDEOS: CarouselVideoItem[] = [
  { id: 'v1', youtubeId: 'i35AUg11hvo', title: 'Wheels on the Bus 🚌', badge: 'Popular Rhyme', subtitle: 'The wheels on the bus go round and round', colorHex: '#F59E0B' },
  { id: 'v2', youtubeId: 'e_04ZrNroTo', title: 'Twinkle Twinkle Little Star ✨', badge: 'Lullaby Song', subtitle: 'How I wonder what you are', colorHex: '#3B82F6' },
  { id: 'v3', youtubeId: 'EA_fbT6oN2k', title: 'Johny Johny Yes Papa 👦', badge: 'Fun Story', subtitle: 'Eating sugar? No papa!', colorHex: '#10B981' },
  { id: 'v4', youtubeId: '1DG6UHDXQ68', title: 'Old MacDonald Had a Farm 🚜', badge: 'Animal Song', subtitle: 'And on his farm he had a cow', colorHex: '#8B5CF6' },
  { id: 'v5', youtubeId: 'YpPPzjSv5R8', title: 'Baby Shark Dance 🦈', badge: 'Dance Nursery', subtitle: 'Baby shark doo doo doo doo', colorHex: '#EC4899' },
];

export const NurseryVideoCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedRhymeForModal, setSelectedRhymeForModal] = useState<RhymeData | null>(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const cardWidth = 340;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showPlayerModal) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % CAROUSEL_RHYMES_VIDEOS.length;
          scrollRef.current?.scrollTo({ x: next * cardWidth, animated: true });
          return next;
        });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [showPlayerModal]);

  const handleOpenFullscreen = (item: CarouselVideoItem) => {
    const rhymeData: RhymeData = {
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      category: item.badge,
      boxBg: '#FEF3C7',
      arrowBg: item.colorHex,
      imageEmoji: '🎵',
      youtubeId: item.youtubeId,
      lyrics: [item.title, item.subtitle],
    };
    setSelectedRhymeForModal(rhymeData);
    setShowPlayerModal(true);
  };

  const allRhymesList: RhymeData[] = CAROUSEL_RHYMES_VIDEOS.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    category: item.badge,
    boxBg: '#FEF3C7',
    arrowBg: item.colorHex,
    imageEmoji: '🎵',
    youtubeId: item.youtubeId,
    lyrics: [item.title, item.subtitle],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.carouselHeader}>
        <Text style={styles.sectionTitle}>Featured Rhymes Videos 🎬</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
          setActiveIndex(newIndex);
        }}
      >
        {CAROUSEL_RHYMES_VIDEOS.map((item) => {
          const thumbnailUrl = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.videoCard, { width: cardWidth - 16 }]}
              onPress={() => handleOpenFullscreen(item)}
              activeOpacity={0.85}
            >
              {/* Badge Header */}
              <View style={styles.fullscreenHeaderOverlay}>
                <View style={[styles.badgePill, { backgroundColor: item.colorHex }]}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>

                <View style={styles.fullscreenBtn}>
                  <Text style={styles.fullscreenBtnText}>⛶ Fullscreen</Text>
                </View>
              </View>

              {/* YouTube Thumbnail Preview Image with Play Overlay */}
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: thumbnailUrl }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
                <View style={styles.playCenterCircle}>
                  <Text style={{ fontSize: 26, marginLeft: 3 }}>▶️</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.dotsRow}>
        {CAROUSEL_RHYMES_VIDEOS.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, activeIndex === idx && styles.activeDot]}
          />
        ))}
      </View>

      {/* Fullscreen Video Player Modal */}
      <RhymePlayerModal
        visible={showPlayerModal}
        rhyme={selectedRhymeForModal}
        allRhymes={allRhymesList}
        onClose={() => setShowPlayerModal(false)}
        onComplete={() => {}}
        onSelectRhyme={(r) => setSelectedRhymeForModal(r)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  carouselHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  tapTip: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  scrollContent: {
    paddingRight: 16,
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    position: 'relative',
  },
  fullscreenHeaderOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  badgePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  fullscreenBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fullscreenBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  playCenterCircle: {
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#2563EB',
  },
});

export default NurseryVideoCarousel;
