import React from 'react';
import { View, TouchableOpacity, ViewProps, TouchableOpacityProps } from 'react-native';
import { styles } from './AppCard.styles';

export interface AppCardProps extends ViewProps {
  selected?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

export const AppCard: React.FC<AppCardProps> = ({
  selected,
  onPress,
  children,
  style,
  ...rest
}) => {
  const cardStyle = [
    styles.card,
    selected && styles.cardSelected,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={cardStyle}
        onPress={onPress}
        {...(rest as TouchableOpacityProps)}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...rest}>
      {children}
    </View>
  );
};
