import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class2DashboardWidget.styles';

export interface Class2DashboardWidgetProps {
  title: string;
}

export const Class2DashboardWidget: React.FC<Class2DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
