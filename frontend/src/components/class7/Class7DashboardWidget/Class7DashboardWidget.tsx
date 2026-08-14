import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class7DashboardWidget.styles';

export interface Class7DashboardWidgetProps {
  title: string;
}

export const Class7DashboardWidget: React.FC<Class7DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
