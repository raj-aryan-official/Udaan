import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Class1SubjectCard.styles';

export interface Class1SubjectCardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const Class1SubjectCard: React.FC<Class1SubjectCardProps> = ({
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
