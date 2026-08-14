/**
 * New Student & Teacher Registration Screen
 * Odaia/English registration form with role selection & PIN setup
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PinPad from '../../components/common/PinPad';
import Button from '../../components/common/Button';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import { colors, layout, typography, spacing } from '../../config/theme';
import { isValidMobile, isValidPin, isValidName } from '../../utils/validators';
import useAuth from '../../hooks/useAuth';

export interface RegisterScreenProps {
  onNavigateLogin: () => void;
  onBack: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigateLogin,
  onBack,
}: RegisterScreenProps) => {
  const { register, isLoading } = useAuth();
  const [fullName, setFullName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [grade, setGrade] = useState<string>('3');
  const [pin, setPin] = useState<string>('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleRegister = async () => {
    setErrorMsg('');
    if (!isValidName(fullName)) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!isValidMobile(mobile)) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!isValidPin(pin)) {
      setErrorMsg('Please set a 4-digit PIN');
      return;
    }

    try {
      await register({
        fullName,
        mobileNumber: mobile,
        pin,
        role,
        grade: parseInt(grade, 10) || 1,
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Try again.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Register Account 📝</Text>
        <AudioPlayButton promptText="Fill your name, mobile number, choose your class grade and select a 4 digit secret PIN." size={44} />
      </View>

      {/* Role Picker */}
      <Text style={styles.label}>I am a:</Text>
      <View style={styles.roleRow}>
        <TouchableOpacity
          onPress={() => setRole('student')}
          style={[styles.roleBtn, role === 'student' && styles.roleActive]}
        >
          <Text style={[styles.roleText, role === 'student' && styles.roleTextActive]}>
            🎓 Student
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRole('teacher')}
          style={[styles.roleBtn, role === 'teacher' && styles.roleActive]}
        >
          <Text style={[styles.roleText, role === 'teacher' && styles.roleTextActive]}>
            👨‍🏫 Teacher
          </Text>
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={(val: string) => setFullName(val)}
        placeholder="e.g. Ramesh Sahu"
        style={styles.input}
      />

      {/* Mobile Input */}
      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        value={mobile}
        onChangeText={(val: string) => setMobile(val)}
        placeholder="10-digit mobile number"
        keyboardType="numeric"
        maxLength={10}
        style={styles.input}
      />

      {/* Grade Selector (if student) */}
      {role === 'student' ? (
        <>
          <Text style={styles.label}>Class / Grade (1 - 10)</Text>
          <TextInput
            value={grade}
            onChangeText={(val: string) => setGrade(val)}
            placeholder="Grade e.g. 1 to 10"
            keyboardType="numeric"
            maxLength={2}
            style={styles.input}
          />
        </>
      ) : null}

      {/* PIN Setup */}
      <Text style={styles.label}>Set 4-Digit Secret PIN</Text>
      <PinPad pin={pin} onPinChange={(val: string) => setPin(val)} error={errorMsg} />

      <Button
        title="Create Account & Start ⭐"
        variant="secondary"
        size="large"
        onPress={handleRegister}
        isLoading={isLoading}
        style={styles.regBtn}
      />

      <TouchableOpacity onPress={onNavigateLogin} style={styles.footerLink}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
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
  roleRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  roleBtn: {
    flex: 1,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.borderDark,
    borderRadius: layout.borderRadius.md,
    alignItems: 'center',
    marginRight: spacing.xs,
    backgroundColor: colors.cardBg,
  },
  roleActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  roleText: {
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  roleTextActive: {
    color: colors.primaryDark,
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
  regBtn: {
    marginTop: spacing.md,
  },
  footerLink: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  linkText: {
    color: colors.primaryDark,
    fontWeight: 'bold',
    fontSize: typography.fontSize.sm,
  },
});

export default RegisterScreen;
