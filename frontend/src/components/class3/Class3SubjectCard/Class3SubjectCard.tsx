import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Class3SubjectCard.styles';

export interface Class3SubjectCardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const Class3SubjectCard: React.FC<Class3SubjectCardProps> = ({
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
