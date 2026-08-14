import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class1DashboardWidget.styles';

export interface Class1DashboardWidgetProps {
  title: string;
}

export const Class1DashboardWidget: React.FC<Class1DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
