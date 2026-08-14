import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Class6SubjectCard.styles';

export interface Class6SubjectCardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const Class6SubjectCard: React.FC<Class6SubjectCardProps> = ({
  title,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};
