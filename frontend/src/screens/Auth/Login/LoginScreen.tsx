import React, { useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image } from 'react-native';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { AppCard } from '../../../components/common/AppCard/AppCard';
import { AppInput } from '../../../components/common/AppInput/AppInput';
import { AppButton } from '../../../components/common/AppButton/AppButton';

const splash3dBg = require('../../../../assets/splash_bg_3d_blue.jpg');
const officialLogo = require('../../../../assets/logo.png');

export interface LoginScreenProps {
  onBack?: () => void;
  onLogin?: (name: string) => void;
  onContinueAsGuest?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onLogin,
  onContinueAsGuest,
}) => {
  const [studentName, setStudentName] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={splash3dBg} style={styles.bgImage} resizeMode="cover">
        <View style={styles.overlay}>
          {onBack && <AppHeader onBack={onBack} />}
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBadge}>
                <Image source={officialLogo} style={styles.logoImg} resizeMode="contain" />
              </View>
              <Text style={styles.title}>उड़ान</Text>
            </View>

            <AppCard style={styles.card}>
              <AppInput
                label="Student Name"
                placeholder="Enter your name"
                value={studentName}
                onChangeText={setStudentName}
              />

              <AppButton
                title="Login"
                variant="amber"
                onPress={() => onLogin?.(studentName || 'Student')}
              />

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <AppButton
                title="Continue as Guest"
                variant="outlined"
                onPress={onContinueAsGuest}
              />
            </AppCard>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0F172A' },
  bgImage: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.45)' },
  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logoBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#60A5FA',
    marginBottom: 8,
  },
  logoImg: { width: 72, height: 72, borderRadius: 36 },
  title: { fontSize: 36, fontWeight: '900', color: '#FFFFFF', letterSpacing: 1 },
  card: { width: '100%', maxWidth: 420, padding: 22, borderRadius: 24, backgroundColor: 'rgba(255, 255, 255, 0.96)' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  dividerText: { marginHorizontal: 12, fontSize: 12, fontWeight: '700', color: '#94A3B8' },
});

export default LoginScreen;
