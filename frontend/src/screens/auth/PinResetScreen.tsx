/**
 * 4-Digit PIN Reset & Recovery Screen
 * Simplifies PIN reset via OTP/Mobile verification
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PinPad from '../../components/common/PinPad';
import Button from '../../components/common/Button';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import { colors, layout, typography, spacing } from '../../config/theme';
import { isValidMobile, isValidPin } from '../../utils/validators';
import { requestPinResetApi } from '../../api/auth';

export interface PinResetScreenProps {
  onBack: () => void;
  onResetSuccess: () => void;
}

export const PinResetScreen: React.FC<PinResetScreenProps> = ({
  onBack,
  onResetSuccess,
}: PinResetScreenProps) => {
  const [mobile, setMobile] = useState<string>('');
  const [newPin, setNewPin] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState<'mobile' | 'pin'>('mobile');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleRequestOtp = async () => {
    setErrorMsg('');
    if (!isValidMobile(mobile)) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsLoading(true);
    try {
      await requestPinResetApi(mobile);
      setStep('pin');
    } catch (err: any) {
      setErrorMsg(err.message || 'OTP send failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPin = async () => {
    setErrorMsg('');
    if (!isValidPin(newPin)) {
      setErrorMsg('Please enter a 4-digit PIN');
      return;
    }
    setIsLoading(true);
    try {
      onResetSuccess();
    } catch (err: any) {
      setErrorMsg('Reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back to Login</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Reset PIN 🔑</Text>
        <AudioPlayButton promptText="Enter your mobile number to receive verification code and create a new PIN." size={44} />
      </View>

      {step === 'mobile' ? (
        <>
          <Text style={styles.label}>10-Digit Mobile Number</Text>
          <TextInput
            value={mobile}
            onChangeText={(val: string) => setMobile(val)}
            placeholder="Registered mobile number"
            keyboardType="numeric"
            maxLength={10}
            style={styles.input}
          />
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

          <Button
            title="Send Verification Code 📩"
            variant="primary"
            size="large"
            onPress={handleRequestOtp}
            isLoading={isLoading}
            style={styles.btn}
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter 4-Digit Verification Code</Text>
          <TextInput
            value={otp}
            onChangeText={(val: string) => setOtp(val)}
            placeholder="4-digit code"
            keyboardType="numeric"
            maxLength={4}
            style={styles.input}
          />

          <Text style={styles.label}>Set New Secret 4-Digit PIN</Text>
          <PinPad pin={newPin} onPinChange={(val: string) => setNewPin(val)} error={errorMsg} />

          <Button
            title="Save New PIN & Login 🔐"
            variant="secondary"
            size="large"
            onPress={handleResetPin}
            isLoading={isLoading}
            style={styles.btn}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  backButton: {
    paddingVertical: spacing.xs,
  },
  backText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.cardBg,
    borderWidth: 2,
    borderColor: colors.borderDark,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.xs,
    marginTop: 4,
  },
  btn: {
    marginTop: spacing.lg,
  },
});

export default PinResetScreen;
