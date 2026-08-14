import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppHeader } from '../../components/common/AppHeader/AppHeader';
import { AppInput } from '../../components/common/AppInput/AppInput';
import { AppButton } from '../../components/common/AppButton/AppButton';
import { TigerAvatar, UdaanLogoEmblem } from '../../components/common/Illustrations';
import { BottomTabBar } from '../../components/navigation/BottomTabBar/BottomTabBar';
import { useAuth, useRewards } from '../../store';

export interface ProfileScreenProps {
  onBack?: () => void;
  onLogout?: () => void;
  onTabPress?: (tab: 'home' | 'quiz' | 'profile' | 'games') => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onLogout, onTabPress }) => {
  const auth = useAuth();
  const rewards = useRewards();

  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const profile = rewards.profile;

  const handleConvertGuest = async () => {
    if (!mobileNumber || mobileNumber.length !== 10 || !pin || pin.length !== 4 || !name) {
      Alert.alert('Form Error', 'Please enter a valid 10-digit mobile number, 4-digit PIN, and your name.');
      return;
    }

    setIsConverting(true);
    const res = await auth.convertGuest({
      mobileNumber,
      pin,
      name,
      role: 'student',
      grade: auth.user?.grade || 'Nursery',
    });
    setIsConverting(false);

    if (res.success) {
      Alert.alert('Account Saved! 🎉', 'Your guest session is now converted into a permanent account!');
    } else {
      Alert.alert('Conversion Failed', res.message || 'Mobile number might already be registered.');
    }
  };

  const handleLogoutPress = async () => {
    await auth.logout();
    onLogout?.();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showLogoBadge showStarBadge starCount={profile?.stars ?? 120} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Udaan Logo Branding Emblem */}
          <View style={styles.emblemWrapper}>
            <UdaanLogoEmblem size={80} />
            <Text style={styles.brandTitle}>Udaan Student Profile</Text>
          </View>

          {/* User Card */}
          <View style={styles.userCard}>
            <View style={styles.avatarWrapper}>
              <TigerAvatar size={70} />
              {auth.isGuest && (
                <View style={styles.guestBadge}>
                  <Text style={styles.guestBadgeText}>GUEST</Text>
                </View>
              )}
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{auth.user?.name || 'Scholar Student'}</Text>
              <Text style={styles.userClass}>Class: {auth.user?.grade || 'Nursery'}</Text>
              <Text style={styles.userPhone}>
                {auth.user?.mobileNumber ? `📱 +91 ${auth.user.mobileNumber}` : 'Guest Session (Active)'}
              </Text>
            </View>
          </View>

          {/* Live DB Rewards Grid */}
          <Text style={styles.sectionHeader}>Live Database Rewards 📊</Text>

          <View style={styles.rewardsGrid}>
            <View style={[styles.statBox, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.statEmoji}>⭐</Text>
              <Text style={styles.statNumber}>{profile?.stars ?? 120}</Text>
              <Text style={styles.statLabel}>Total Stars</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: '#FFEDD5' }]}>
              <Text style={styles.statEmoji}>🪙</Text>
              <Text style={styles.statNumber}>{profile?.coins ?? 45}</Text>
              <Text style={styles.statLabel}>Total Coins</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: '#E0E7FF' }]}>
              <Text style={styles.statEmoji}>📈</Text>
              <Text style={styles.statNumber}>{profile?.xp ?? 250}</Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: '#FEE2E2' }]}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statNumber}>{profile?.streak ?? 3} Days</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>

          {/* Plant & Pet State */}
          <View style={styles.extraStatsRow}>
            <View style={[styles.extraBox, { backgroundColor: '#DCFCE7' }]}>
              <Text style={styles.extraEmoji}>🌱</Text>
              <Text style={styles.extraTitle}>Plant Stage {profile?.plantStage ?? 1} / 5</Text>
            </View>

            <View style={[styles.extraBox, { backgroundColor: '#FFF7ED' }]}>
              <Text style={styles.extraEmoji}>🐶</Text>
              <Text style={styles.extraTitle}>Pet Mood: {profile?.petMood ?? 'Happy'}</Text>
            </View>
          </View>

          {/* Unlocked Badges Showcase */}
          <Text style={styles.sectionHeader}>Earned Badges 🏅</Text>
          <View style={styles.badgesRow}>
            <View style={styles.badgeChip}>
              <Text style={styles.badgeEmoji}>🌟</Text>
              <Text style={styles.badgeTitle}>ABC Star</Text>
            </View>
            <View style={styles.badgeChip}>
              <Text style={styles.badgeEmoji}>🎵</Text>
              <Text style={styles.badgeTitle}>Rhyme Master</Text>
            </View>
            <View style={styles.badgeChip}>
              <Text style={styles.badgeEmoji}>🏆</Text>
              <Text style={styles.badgeTitle}>Quiz Champion</Text>
            </View>
          </View>

          {/* Convert Guest Form (If Guest) */}
          {auth.isGuest && (
            <View style={styles.convertCard}>
              <Text style={styles.convertTitle}>Save Your Progress Forever 💾</Text>
              <Text style={styles.convertDesc}>
                Convert your guest session to a permanent account so you never lose your stars & badges!
              </Text>

              <AppInput
                label="Full Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />

              <AppInput
                label="Mobile Number"
                countryCode="+91"
                placeholder="10 digit mobile"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />

              <AppInput
                label="4-Digit PIN"
                placeholder="Enter 4-digit PIN"
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
                value={pin}
                onChangeText={setPin}
              />

              <AppButton
                title={isConverting ? 'Saving Account...' : 'Save Account & Retain Rewards 🚀'}
                variant="amber"
                onPress={handleConvertGuest}
              />
            </View>
          )}

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
            <Text style={styles.logoutText}>🔒 Logout / Change Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomTabBar activeTab="profile" onTabPress={(tab) => onTabPress?.(tab)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 12 },
  emblemWrapper: { alignItems: 'center', marginBottom: 14 },
  brandTitle: { fontSize: 18, fontWeight: '800', color: '#1E3A8A', marginTop: 4 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  avatarWrapper: { marginRight: 14, alignItems: 'center' },
  guestBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: -6,
  },
  guestBadgeText: { fontSize: 9, fontWeight: '800', color: '#FFFFFF' },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  userClass: { fontSize: 13, fontWeight: '600', color: '#3B82F6', marginTop: 2 },
  userPhone: { fontSize: 12, color: '#64748B', marginTop: 2 },
  sectionHeader: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 10 },
  rewardsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statBox: {
    width: '48.5%',
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  statEmoji: { fontSize: 26, marginBottom: 2 },
  statNumber: { fontSize: 20, fontWeight: '900', color: '#1E293B' },
  statLabel: { fontSize: 12, fontWeight: '600', color: '#475569', marginTop: 2 },
  extraStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  extraBox: {
    width: '48.5%',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraEmoji: { fontSize: 22, marginRight: 8 },
  extraTitle: { fontSize: 12, fontWeight: '700', color: '#1E293B' },
  badgesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  badgeChip: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  badgeEmoji: { fontSize: 22, marginBottom: 2 },
  badgeTitle: { fontSize: 11, fontWeight: '700', color: '#334155' },
  convertCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    padding: 18,
    borderWidth: 2,
    borderColor: '#F59E0B',
    marginBottom: 16,
  },
  convertTitle: { fontSize: 16, fontWeight: '800', color: '#78350F', marginBottom: 4 },
  convertDesc: { fontSize: 12, color: '#92400E', marginBottom: 12 },
  logoutButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EF4444',
    marginBottom: 20,
  },
  logoutText: { fontSize: 15, fontWeight: '800', color: '#B91C1C' },
});

export default ProfileScreen;
