/**
 * Udaan React Native Application Entry Point
 * Wraps global context providers (AuthProvider & GameProvider) and RootNavigator
 * Odisha Rural Education Platform (SIH 2025)
 */

import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { GameProvider } from './src/context/GameContext';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/config/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AuthProvider>
        <GameProvider>
          <SafeAreaView style={styles.safeArea}>
            <RootNavigator />
          </SafeAreaView>
        </GameProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
