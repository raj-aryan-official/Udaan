/**
 * 4-Digit Numeric PIN Pad Component
 * Allows rural users without technical literacy to enter their 4-digit PIN easily
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, layout, typography, spacing } from '../../config/theme';

export interface PinPadProps {
  pin: string;
  onPinChange: (newPin: string) => void;
  maxLength?: number;
  error?: string;
}

export const PinPad: React.FC<PinPadProps> = ({
  pin,
  onPinChange,
  maxLength = 4,
  error,
}: PinPadProps) => {
  const handleKeyPress = (num: string) => {
    if (pin.length < maxLength) {
      onPinChange(pin + num);
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      onPinChange(pin.slice(0, -1));
    }
  };

  const handleClear = () => {
    onPinChange('');
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < maxLength; i++) {
      const isFilled = i < pin.length;
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            isFilled && styles.dotFilled,
            error ? styles.dotError : null,
          ]}
        />
      );
    }
    return dots;
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

  return (
    <View style={styles.container}>
      {/* PIN Dots Display */}
      <View style={styles.dotsContainer}>{renderDots()}</View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Keypad Grid */}
      <View style={styles.grid}>
        {keys.map((key, index) => {
          let onPressAction = () => handleKeyPress(key);
          if (key === 'C') onPressAction = handleClear;
          if (key === '⌫') onPressAction = handleDelete;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={onPressAction}
              style={[
                styles.keyButton,
                key === 'C' || key === '⌫' ? styles.actionKey : null,
              ]}
            >
              <Text
                style={[
                  styles.keyText,
                  key === 'C' || key === '⌫' ? styles.actionKeyText : null,
                ]}
              >
                {key}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    marginHorizontal: spacing.sm,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: colors.primary,
  },
  dotError: {
    borderColor: colors.error,
    backgroundColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 270,
    justifyContent: 'space-between',
  },
  keyButton: {
    width: 75,
    height: 65,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.cardBgLight,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    elevation: 2,
  },
  keyText: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  actionKey: {
    backgroundColor: '#FFF3E0',
    borderColor: colors.secondary,
  },
  actionKeyText: {
    color: colors.secondaryDark,
    fontSize: typography.fontSize.lg,
  },
});

export default PinPad;
