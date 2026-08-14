import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Class3DashboardWidget.styles';

export interface Class3DashboardWidgetProps {
  title: string;
}

export const Class3DashboardWidget: React.FC<Class3DashboardWidgetProps> = ({ title }) => {
  return (
    <View style={styles.widget}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};
