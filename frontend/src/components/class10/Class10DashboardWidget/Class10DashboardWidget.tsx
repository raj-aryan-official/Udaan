import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class10DashboardWidget.styles';

export interface Class10DashboardWidgetProps {
  title: string;
}

export const Class10DashboardWidget: React.FC<Class10DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
