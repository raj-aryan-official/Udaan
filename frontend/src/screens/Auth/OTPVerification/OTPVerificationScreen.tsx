import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { BirdPhoneCharacter } from '../../../components/common/Illustrations';
import { AppInput } from '../../../components/common/AppInput/AppInput';
import { AppButton } from '../../../components/common/AppButton/AppButton';

const splash3dBg = require('../../../../assets/splash_bg_3d_blue.jpg');

export interface OTPVerificationScreenProps {
  onBack?: () => void;
  onVerify?: () => void;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  onBack,
  onVerify,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const CheckIcon = (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={splash3dBg} style={styles.bgImage} resizeMode="cover">
        <View style={styles.overlay}>
          {onBack && <AppHeader onBack={onBack} />}

          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.characterContainer}>
                <BirdPhoneCharacter size={100} />
              </View>

              <Text style={styles.title}>Verify Phone Number</Text>
              <Text style={styles.subtitle}>
                We'll send a 4-digit code to your phone to keep your account safe.
              </Text>

              <View style={styles.phoneInputContainer}>
                <AppInput
                  label="Phone Number"
                  placeholder="Enter 10-digit mobile number"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  maxLength={10}
                />
              </View>

              <Text style={styles.otpLabel}>Enter 4-Digit Code</Text>
              <View style={styles.otpInputsContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    style={[
                      styles.otpBox,
                      digit ? styles.otpBoxFilled : null,
                    ]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                  />
                ))}
              </View>

              <View style={styles.verifyButtonContainer}>
                <AppButton
                  title="Verify & Continue"
                  variant="navy"
                  iconRight={CheckIcon}
                  onPress={onVerify}
                />
              </View>

              <TouchableOpacity style={styles.resendContainer} activeOpacity={0.7}>
                <Text style={styles.resendText}>
                  Didn't receive code? <Text style={styles.resendLink}>Resend OTP</Text>
                </Text>
              </TouchableOpacity>
            </View>
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
  card: { width: '100%', maxWidth: 440, padding: 22, borderRadius: 24, backgroundColor: 'rgba(255, 255, 255, 0.96)', alignItems: 'center' },
  characterContainer: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 16 },
  phoneInputContainer: { width: '100%', marginBottom: 14 },
  otpLabel: { fontSize: 13, fontWeight: '700', color: '#334155', alignSelf: 'flex-start', marginBottom: 8 },
  otpInputsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  otpBox: { width: 56, height: 60, borderRadius: 16, backgroundColor: '#F1F5F9', borderWidth: 2, borderColor: '#CBD5E1', textAlign: 'center', fontSize: 24, fontWeight: '800', color: '#1E293B' },
  otpBoxFilled: { backgroundColor: '#EFF6FF', borderColor: '#3B82F6', color: '#1D4ED8' },
  verifyButtonContainer: { width: '100%', marginBottom: 12 },
  resendContainer: { padding: 4 },
  resendText: { fontSize: 13, color: '#64748B' },
  resendLink: { color: '#2563EB', fontWeight: '700' },
});

export default OTPVerificationScreen;
