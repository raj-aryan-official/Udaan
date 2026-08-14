import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class6DashboardWidget.styles';

export interface Class6DashboardWidgetProps {
  title: string;
}

export const Class6DashboardWidget: React.FC<Class6DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
