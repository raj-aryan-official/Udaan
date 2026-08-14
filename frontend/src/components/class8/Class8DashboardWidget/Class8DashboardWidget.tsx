import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class8DashboardWidget.styles';

export interface Class8DashboardWidgetProps {
  title: string;
}

export const Class8DashboardWidget: React.FC<Class8DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
