import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AudioPlayButtonProps {
  label?: string;
  audioRef?: string;
}

export const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  label = 'Listen in Odia (ଶୁଣନ୍ତୁ)',
  audioRef,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Audio player trigger service call
  };

  return (
    <TouchableOpacity
      style={[styles.button, isPlaying && styles.buttonActive]}
      onPress={togglePlay}
    >
      <Text style={styles.icon}>{isPlaying ? '🔊' : '🎧'}</Text>
      <Text style={styles.text}>{isPlaying ? 'Playing Voiceover...' : label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0288D1',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginVertical: 6,
  },
  buttonActive: {
    backgroundColor: '#0097A7',
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
