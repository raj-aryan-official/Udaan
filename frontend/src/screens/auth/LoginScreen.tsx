/**
 * Mobile Number & 4-Digit PIN Login Screen
 * Simplified authentication for rural students and teachers
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PinPad from '../../components/common/PinPad';
import Button from '../../components/common/Button';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import { colors, layout, typography, spacing } from '../../config/theme';
import { isValidMobile, isValidPin } from '../../utils/validators';
import useAuth from '../../hooks/useAuth';

export interface LoginScreenProps {
  onNavigateRegister: () => void;
  onNavigatePinReset: () => void;
  onBack: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateRegister,
  onNavigatePinReset,
  onBack,
}: LoginScreenProps) => {
  const { login, isLoading } = useAuth();
  const [mobile, setMobile] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLogin = async () => {
    setErrorMsg('');
    if (!isValidMobile(mobile)) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!isValidPin(pin)) {
      setErrorMsg('Please enter a 4-digit PIN');
      return;
    }

    try {
      await login({ mobileNumber: mobile, pin });
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check mobile and PIN.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Mobile PIN Login 📱</Text>
        <AudioPlayButton
          promptText="Enter your 10-digit mobile number and tap 4 numbers on the keypad for your PIN."
          size={44}
        />
      </View>

      {/* Mobile Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>10-Digit Mobile Number</Text>
        <TextInput
          value={mobile}
          onChangeText={(val: string) => setMobile(val)}
          placeholder="e.g. 9876543210"
          keyboardType="numeric"
          maxLength={10}
          style={styles.input}
        />
      </View>

      {/* PIN Pad Component */}
      <Text style={styles.label}>4-Digit PIN Keypad</Text>
      <PinPad pin={pin} onPinChange={(val: string) => setPin(val)} error={errorMsg} />

      {/* Login Button */}
      <Button
        title="Login to Udaan 🚀"
        variant="primary"
        size="large"
        onPress={handleLogin}
        isLoading={isLoading}
        style={styles.loginBtn}
      />

      {/* Footer Navigation */}
      <View style={styles.footerRow}>
        <TouchableOpacity onPress={onNavigatePinReset}>
          <Text style={styles.linkText}>Forgot PIN?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNavigateRegister}>
          <Text style={styles.linkText}>New Student? Register</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    marginVertical: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.cardBg,
    borderWidth: 2,
    borderColor: colors.borderDark,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  loginBtn: {
    marginTop: spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  linkText: {
    color: colors.primaryDark,
    fontWeight: 'bold',
    fontSize: typography.fontSize.sm,
  },
});

export default LoginScreen;
