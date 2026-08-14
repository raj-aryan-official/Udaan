import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, Image } from 'react-native';

const splash3dBg = require('../../../assets/splash_bg_3d_blue.jpg');
const officialLogo = require('../../../assets/logo.png');

export interface SplashScreenProps {
  onNext?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={splash3dBg} style={styles.bgImage} resizeMode="cover">
        <View style={styles.overlayContainer}>
          <TouchableOpacity activeOpacity={0.95} style={styles.contentBox} onPress={onNext}>
            {/* Center Hero Section with Big 3D Logo */}
            <View style={styles.heroSection}>
              <View style={styles.bigLogoWrapper}>
                <Image source={officialLogo} style={styles.bigLogoImage} resizeMode="contain" />
              </View>
              <Text style={styles.brandTitle}>उड़ान</Text>
              <Text style={styles.brandSub}>Empowering Young Minds 🚀</Text>
            </View>

            {/* Bottom Footer Section */}
            <View style={styles.footerSection}>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
              <Text style={styles.byText}>By SIH25048</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  contentBox: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 36,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  bigLogoWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#60A5FA',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    marginBottom: 20,
  },
  bigLogoImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  brandTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  brandSub: {
    fontSize: 16,
    fontWeight: '700',
    color: '#93C5FD',
    marginTop: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  footerSection: {
    width: '100%',
    alignItems: 'center',
  },
  progressBarBg: {
    width: 160,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 3,
  },
  byText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.75)',
  },
});

export default SplashScreen;
