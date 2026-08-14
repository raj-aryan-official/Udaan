import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Class2SubjectCard.styles';

export interface Class2SubjectCardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const Class2SubjectCard: React.FC<Class2SubjectCardProps> = ({
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
