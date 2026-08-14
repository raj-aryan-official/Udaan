/**
 * Audio Play Button Component
 * Voiceover helper button for low-literacy users
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, layout, spacing } from '../../config/theme';
import soundService from '../../services/soundService';

export interface AudioPlayButtonProps {
  promptText: string;
  language?: 'or' | 'en';
  size?: number;
  style?: ViewStyle;
}

export const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  promptText,
  language = 'or',
  size = 48,
  style,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = async () => {
    if (!promptText) return;
    setIsPlaying(true);
    soundService.speakPrompt(promptText, language);
    setTimeout(() => {
      setIsPlaying(false);
    }, 2500);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePlay}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: isPlaying ? colors.secondary : colors.primaryLight,
          borderColor: isPlaying ? colors.secondaryDark : colors.primary,
        },
        style,
      ]}
    >
      <Text style={[styles.icon, { fontSize: size * 0.45 }]}>
        {isPlaying ? '🔊' : '🔈'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xs,
    elevation: layout.elevation.low,
  },
  icon: {
    textAlign: 'center',
  },
});

export default AudioPlayButton;
