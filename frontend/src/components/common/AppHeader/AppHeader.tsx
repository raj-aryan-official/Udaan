import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { styles } from './AppHeader.styles';

const officialLogo = require('../../../../assets/logo.png');

export interface AppHeaderProps {
  onBack?: () => void;
  showLogoBadge?: boolean;
  showStarBadge?: boolean;
  starCount?: number;
  showGraduationCapLogo?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onBack,
  showLogoBadge,
  showStarBadge,
  starCount = 120,
  showGraduationCapLogo,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        {onBack && (
          <TouchableOpacity activeOpacity={0.7} style={styles.backButton} onPress={onBack}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        )}

        {(showLogoBadge || showGraduationCapLogo) && (
          <View style={styles.logoBadge}>
            <Image
              source={officialLogo}
              style={{ width: 26, height: 26, borderRadius: 13, marginRight: 6 }}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>उड़ान</Text>
          </View>
        )}
      </View>

      <View style={styles.rightSection}>
        {showStarBadge && (
          <View style={styles.starBadge}>
            <Text style={styles.starText}>{starCount} ★</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AppHeader;
