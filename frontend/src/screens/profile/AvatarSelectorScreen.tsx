/**
 * Cultural Odia Avatar Selector Screen
 * Customization picker for rural student profile avatars
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { colors, layout, typography, spacing } from '../../config/theme';
import useAuth from '../../hooks/useAuth';

export interface AvatarSelectorScreenProps {
  onBack: () => void;
}

export const AvatarSelectorScreen: React.FC<AvatarSelectorScreenProps> = ({
  onBack,
}: AvatarSelectorScreenProps) => {
  const { user, updateProfile } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<string>(user?.avatar || '👦');

  const avatars = [
    { id: '1', emoji: '👦', name: 'Boy Student' },
    { id: '2', emoji: '👧', name: 'Girl Student' },
    { id: '3', emoji: '🐯', name: 'Royal Tiger' },
    { id: '4', emoji: '🦚', name: 'Peacock' },
    { id: '5', emoji: '🐘', name: 'Elephant' },
    { id: '6', emoji: '🌴', name: 'Banyan Tree' },
  ];

  const handleSaveAvatar = async () => {
    await updateProfile({ avatar: selectedAvatar });
    onBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Choose Avatar 🎨</Text>
      </View>

      <Text style={styles.subTitle}>Select your favourite profile character:</Text>

      <View style={styles.grid}>
        {avatars.map((av) => (
          <TouchableOpacity
            key={av.id}
            onPress={() => setSelectedAvatar(av.emoji)}
            style={[
              styles.avatarCard,
              selectedAvatar === av.emoji && styles.avatarSelected,
            ]}
          >
            <Text style={styles.avatarEmoji}>{av.emoji}</Text>
            <Text style={styles.avatarName}>{av.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Save Selected Avatar ✨"
        variant="primary"
        size="large"
        onPress={handleSaveAvatar}
        style={styles.saveBtn}
      />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  backButton: {
    marginRight: spacing.md,
  },
  backText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarCard: {
    width: '47%',
    backgroundColor: colors.cardBg,
    borderWidth: 2,
    borderColor: colors.borderDark,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  avatarEmoji: {
    fontSize: 48,
    marginBottom: spacing.xs,
  },
  avatarName: {
    fontSize: typography.fontSize.xs,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  saveBtn: {
    marginTop: spacing.md,
  },
});

export default AvatarSelectorScreen;
