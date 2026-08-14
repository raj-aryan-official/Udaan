import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Platform, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export interface RhymeData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  boxBg: string;
  arrowBg: string;
  cardBorder?: string;
  imageEmoji: string;
  audioUrl?: string;
  youtubeId?: string;
  lyrics: string[];
}

export interface RhymePlayerModalProps {
  visible: boolean;
  rhyme: RhymeData | null;
  allRhymes?: RhymeData[];
  onClose: () => void;
  onComplete: (rhymeId: string, title: string) => void;
  onSelectRhyme?: (rhyme: RhymeData) => void;
}

export const RhymePlayerModal: React.FC<RhymePlayerModalProps> = ({
  visible,
  rhyme,
  allRhymes = [],
  onClose,
  onComplete,
  onSelectRhyme,
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isLandscape = windowWidth > windowHeight;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const iframeRef = useRef<any>(null);

  useEffect(() => {
    if (visible) {
      setIsPlaying(true);
      setCurrentLineIndex(0);
    } else {
      setIsPlaying(false);
    }
  }, [visible, rhyme]);

  if (!rhyme) return null;

  const youtubeId = rhyme.youtubeId || 'i35AUg11hvo';

  const handleShuffle = () => {
    setIsShuffled(true);
    if (allRhymes.length > 1) {
      const available = allRhymes.filter((r) => r.id !== rhyme.id);
      const randomIndex = Math.floor(Math.random() * available.length);
      onSelectRhyme?.(available[randomIndex]);
    } else if (allRhymes.length === 1) {
      onSelectRhyme?.(allRhymes[0]);
    }
  };

  const handleCompleteRhyme = () => {
    setIsPlaying(false);
    onComplete(rhyme.id, rhyme.title);
  };

  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&enablejsapi=1&loop=${isLooping ? 1 : 0}&playlist=${youtubeId}&rel=0&modestbranding=1`;

  // Responsive video height calculation (16:9 widescreen adaptation)
  const videoHeight = isFullScreen
    ? (isLandscape ? Math.min(windowHeight * 0.65, 480) : Math.min(windowWidth * 0.5625, 340))
    : 220;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[
          styles.modalCard,
          isFullScreen && { maxWidth: '96%', maxHeight: '96%', padding: 12 },
        ]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleWrapper}>
              <Text style={styles.rhymeCategory}>{rhyme.category}</Text>
              <Text style={styles.rhymeTitle}>{rhyme.title}</Text>
            </View>

            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.fullScreenBtn}
                onPress={() => setIsFullScreen((prev) => !prev)}
              >
                <Text style={styles.btnText}>{isFullScreen ? '↙️ Exit Full' : '⛶ Full Screen'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          {/* YouTube Video Player Embed (Responsive 16:9 Widescreen) */}
          <View style={[styles.videoContainer, { height: videoHeight }]}>
            {Platform.OS === 'web' ? (
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src={embedUrl}
                title={rhyme.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: 16 }}
              />
            ) : (
              <View style={[styles.placeholderBox, { backgroundColor: rhyme.boxBg }]}>
                <Text style={{ fontSize: 64 }}>{rhyme.imageEmoji}</Text>
                <Text style={styles.placeholderText}>▶️ Playing YouTube Video</Text>
              </View>
            )}
          </View>

          {/* Controls Toolbar: Loop & Shuffle */}
          <View style={styles.controlsBar}>
            <TouchableOpacity
              style={[styles.controlBtn, isLooping && styles.activeControl]}
              onPress={() => setIsLooping((prev) => !prev)}
            >
              <Text style={[styles.controlIcon, isLooping && styles.activeControlText]}>
                🔄 {isLooping ? 'Loop ON (Repeat)' : 'Loop OFF'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlBtn, isShuffled && styles.activeControl]}
              onPress={handleShuffle}
            >
              <Text style={[styles.controlIcon, isShuffled && styles.activeControlText]}>
                🔀 Shuffle Next 🎲
              </Text>
            </TouchableOpacity>
          </View>

          {/* Line-by-Line Karaoke Lyrics */}
          {rhyme.lyrics && rhyme.lyrics.length > 0 && !isLandscape && (
            <View style={styles.lyricsContainer}>
              <Text style={styles.lyricsTitle}>🎵 Song Lyrics</Text>
              <ScrollView style={styles.lyricsScroll}>
                {rhyme.lyrics.map((line, idx) => (
                  <Text
                    key={idx}
                    style={[
                      styles.lyricLine,
                      idx === currentLineIndex && styles.activeLyricLine,
                    ]}
                  >
                    {line}
                  </Text>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Footer Action Button */}
          <TouchableOpacity style={styles.completeBtn} onPress={handleCompleteRhyme}>
            <Text style={styles.completeBtnText}>Claim 5 Stars Reward ⭐</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  modalCard: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    maxHeight: '94%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWrapper: {
    flex: 1,
    paddingRight: 8,
  },
  rhymeCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    textTransform: 'uppercase',
  },
  rhymeTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullScreenBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  btnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  closeBtn: {
    padding: 4,
  },
  videoContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#0F172A',
    width: '100%',
  },
  placeholderBox: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
  },
  controlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  controlBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeControl: {
    backgroundColor: '#DBEAFE',
  },
  controlIcon: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  activeControlText: {
    color: '#1D4ED8',
    fontWeight: '800',
  },
  lyricsContainer: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 12,
    maxHeight: 110,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  lyricsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B45309',
    marginBottom: 6,
  },
  lyricsScroll: {
    flex: 1,
  },
  lyricLine: {
    fontSize: 13,
    fontWeight: '600',
    color: '#78350F',
    marginVertical: 2,
  },
  activeLyricLine: {
    fontSize: 14,
    fontWeight: '900',
    color: '#D97706',
  },
  completeBtn: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  completeBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});

export default RhymePlayerModal;
