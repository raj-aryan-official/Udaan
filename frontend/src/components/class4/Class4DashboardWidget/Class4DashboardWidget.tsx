import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class4DashboardWidget.styles';

export interface Class4DashboardWidgetProps {
  title: string;
}

export const Class4DashboardWidget: React.FC<Class4DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
