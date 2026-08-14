import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { styles } from './BottomTabBar.styles';

export interface BottomTabBarProps {
  activeTab: 'home' | 'quiz' | 'profile' | 'games';
  onTabPress: (tab: 'home' | 'quiz' | 'profile' | 'games') => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tabItem, activeTab === 'home' && styles.tabItemActive]}
        onPress={() => onTabPress('home')}
      >
        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <Path
            d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
            fill={activeTab === 'home' ? '#FFFFFF' : 'none'}
            stroke={activeTab === 'home' ? '#FFFFFF' : '#64748B'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M9 22V12h6v10"
            stroke={activeTab === 'home' ? '#2563EB' : '#64748B'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Home</Text>
      </TouchableOpacity>

      {/* Games Tab (Replaced Quiz with Games) */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tabItem, (activeTab === 'games' || activeTab === 'quiz') && styles.tabItemActive]}
        onPress={() => onTabPress('games')}
      >
        <Text style={{ fontSize: 20 }}>🎮</Text>
        <Text style={[styles.tabLabel, (activeTab === 'games' || activeTab === 'quiz') && styles.tabLabelActive]}>
          Games
        </Text>
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tabItem, activeTab === 'profile' && styles.tabItemActive]}
        onPress={() => onTabPress('profile')}
      >
        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <Path
            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
            stroke={activeTab === 'profile' ? '#FFFFFF' : '#64748B'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle
            cx="12"
            cy="7"
            r="4"
            fill={activeTab === 'profile' ? '#FFFFFF' : 'none'}
            stroke={activeTab === 'profile' ? '#FFFFFF' : '#64748B'}
            strokeWidth="2"
          />
        </Svg>
        <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabBar;
