import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Class5SubjectCard.styles';

export interface Class5SubjectCardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const Class5SubjectCard: React.FC<Class5SubjectCardProps> = ({
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
