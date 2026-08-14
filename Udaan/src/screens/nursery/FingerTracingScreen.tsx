import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AudioPlayButton } from '../../components/audio/AudioPlayButton';

export const FingerTracingScreen: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState('ଅ');
  const [traced, setTraced] = useState(false);

  const handleTraceComplete = () => {
    setTraced(true);
    // Triggers POST /activities/:id/complete on backend
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Odia Alphabet Tracing (ଅକ୍ଷର ଲେଖିବା)</Text>
      <AudioPlayButton label="Hear Pronunciation: 'A' (ଅ)" />
      
      <View style={styles.tracingCanvas}>
        <Text style={styles.guideLetter}>{currentLetter}</Text>
        <TouchableOpacity style={styles.touchArea} onPress={handleTraceComplete}>
          <Text style={styles.promptText}>
            {traced ? '✨ Perfect Trace! +10 ⭐' : '☝️ Trace over letter with your finger'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 12,
  },
  tracingCanvas: {
    width: 280,
    height: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#FFB300',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
  },
  guideLetter: {
    fontSize: 160,
    color: '#E0E0E0',
    fontWeight: 'bold',
  },
  touchArea: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FFF3E0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  promptText: {
    fontSize: 14,
    color: '#EF6C00',
    fontWeight: '600',
  },
});
