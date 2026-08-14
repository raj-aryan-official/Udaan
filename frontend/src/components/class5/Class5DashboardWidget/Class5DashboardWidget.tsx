import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class5DashboardWidget.styles';

export interface Class5DashboardWidgetProps {
  title: string;
}

export const Class5DashboardWidget: React.FC<Class5DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
