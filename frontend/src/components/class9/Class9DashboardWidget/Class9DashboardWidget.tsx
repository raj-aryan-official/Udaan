import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class9DashboardWidget.styles';

export interface Class9DashboardWidgetProps {
  title: string;
}

export const Class9DashboardWidget: React.FC<Class9DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
