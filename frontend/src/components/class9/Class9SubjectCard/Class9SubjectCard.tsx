import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Class9SubjectCard.styles';

export interface Class9SubjectCardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const Class9SubjectCard: React.FC<Class9SubjectCardProps> = ({
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
