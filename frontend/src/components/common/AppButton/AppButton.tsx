import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TouchableOpacityProps } from 'react-native';
import { styles } from './AppButton.styles';

export interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'amber' | 'navy' | 'outlined';
  iconRight?: React.ReactNode;
  disabled?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'amber',
  iconRight,
  disabled,
  style,
  onPress,
  ...rest
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'amber' && styles.primaryAmber,
    variant === 'navy' && styles.primaryNavy,
    variant === 'outlined' && styles.secondaryOutlined,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    variant === 'outlined' ? styles.textSecondary : styles.textPrimary,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={buttonStyle}
      disabled={disabled}
      onPress={onPress}
      {...rest}
    >
      <Text style={textStyle}>{title}</Text>
      {iconRight && <View style={styles.iconContainer}>{iconRight}</View>}
    </TouchableOpacity>
  );
};
