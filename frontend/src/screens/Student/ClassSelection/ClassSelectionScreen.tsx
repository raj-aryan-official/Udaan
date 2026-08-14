import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TigerAvatar } from '../../../components/common/Illustrations';
import { AppInput } from '../../../components/common/AppInput/AppInput';
import { AppButton } from '../../../components/common/AppButton/AppButton';

const splash3dBg = require('../../../../assets/splash_bg_3d_blue.jpg');

export interface ClassOption {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  category: 'primary' | 'middle' | 'high';
  colorHex: string;
}

export const CLASS_OPTIONS: ClassOption[] = [
  { id: 'nursery', title: 'Nursery', subtitle: 'Early Learning & Rhymes', emoji: '🏎️', category: 'primary', colorHex: '#F59E0B' },
  { id: 'class1', title: 'Class 1', subtitle: 'Numbers 1-20 & Phonics', emoji: '✏️', category: 'primary', colorHex: '#3B82F6' },
  { id: 'class2', title: 'Class 2', subtitle: 'Addition & Grammar', emoji: '📖', category: 'primary', colorHex: '#10B981' },
  { id: 'class3', title: 'Class 3', subtitle: 'Multiplication & Time', emoji: '🕒', category: 'primary', colorHex: '#8B5CF6' },
  { id: 'class4', title: 'Class 4', subtitle: 'EVS Science & Solar', emoji: '🌌', category: 'primary', colorHex: '#EC4899' },
  { id: 'class5', title: 'Class 5', subtitle: 'Decimals & Health', emoji: '🧪', category: 'middle', colorHex: '#14B8A6' },
  { id: 'class6', title: 'Class 6', subtitle: 'Food Science & Ratios', emoji: '🍎', category: 'middle', colorHex: '#F97316' },
  { id: 'class7', title: 'Class 7', subtitle: 'Integers & Acids', emoji: '⚗️', category: 'middle', colorHex: '#6366F1' },
  { id: 'class8', title: 'Class 8', subtitle: 'Physics & Cell Science', emoji: '⚡', category: 'middle', colorHex: '#06B6D4' },
  { id: 'class9', title: 'Class 9', subtitle: 'Motion & Algebra', emoji: '📐', category: 'high', colorHex: '#3B82F6' },
  { id: 'class10', title: 'Class 10', subtitle: 'Board Exam & Chemistry', emoji: '🏆', category: 'high', colorHex: '#EF4444' },
];

export interface ClassSelectionScreenProps {
  onStartLearning?: (childName: string, selectedClass: string) => void;
}

export const ClassSelectionScreen: React.FC<ClassSelectionScreenProps> = ({
  onStartLearning,
}) => {
  const [childName, setChildName] = useState('');
  const [selectedClass, setSelectedClass] = useState('nursery');
  const [selectedTab, setSelectedTab] = useState<'all' | 'primary' | 'middle' | 'high'>('all');

  const filteredClasses = selectedTab === 'all'
    ? CLASS_OPTIONS
    : CLASS_OPTIONS.filter((c) => c.category === selectedTab);

  const RightArrowIcon = (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={splash3dBg} style={styles.bgImage} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              {/* Header Welcome Banner */}
              <View style={styles.headerBanner}>
                <TigerAvatar size={64} />
                <View style={styles.headerTextWrapper}>
                  <Text style={styles.welcomeTitle}>Welcome, Scholar! 🚀</Text>
                  <Text style={styles.welcomeSub}>Pick your class grade to start learning</Text>
                </View>
              </View>

              {/* Main Card Container */}
              <View style={styles.cardBox}>
                <AppInput
                  label="Student / Child Name"
                  placeholder="Enter name here"
                  value={childName}
                  onChangeText={setChildName}
                />

                <Text style={styles.sectionTitle}>Select Class Grade 🎓</Text>

                {/* Level Filter Tabs */}
                <View style={styles.tabContainer}>
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'primary', label: 'Nursery - Cl 4' },
                    { id: 'middle', label: 'Cl 5 - Cl 8' },
                    { id: 'high', label: 'Cl 9 - Cl 10' },
                  ].map((tab) => (
                    <TouchableOpacity
                      key={tab.id}
                      style={[styles.tabPill, selectedTab === tab.id && styles.activeTabPill]}
                      onPress={() => setSelectedTab(tab.id as any)}
                    >
                      <Text style={[styles.tabText, selectedTab === tab.id && styles.activeTabText]}>
                        {tab.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 2-Column Compact Grid */}
                <View style={styles.grid}>
                  {filteredClasses.map((cls) => {
                    const isSelected = selectedClass === cls.id;
                    return (
                      <TouchableOpacity
                        key={cls.id}
                        style={[
                          styles.gridCard,
                          isSelected && { borderColor: cls.colorHex, backgroundColor: '#EFF6FF' },
                        ]}
                        onPress={() => setSelectedClass(cls.id)}
                        activeOpacity={0.85}
                      >
                        <View style={styles.cardHeader}>
                          <Text style={styles.cardEmoji}>{cls.emoji}</Text>
                          {isSelected && (
                            <View style={[styles.checkDot, { backgroundColor: cls.colorHex }]}>
                              <Text style={styles.checkCheck}>✓</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.cardTitle}>{cls.title}</Text>
                        <Text style={styles.cardSub} numberOfLines={1}>{cls.subtitle}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={{ marginTop: 14 }}>
                  <AppButton
                    title="Start Learning 🚀"
                    variant="navy"
                    iconRight={RightArrowIcon}
                    onPress={() => onStartLearning?.(childName, selectedClass)}
                  />
                </View>
              </View>
            </ScrollView>
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
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 18, alignItems: 'center' },
  headerBanner: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, width: '100%', maxWidth: 440 },
  headerTextWrapper: { marginLeft: 12, flex: 1 },
  welcomeTitle: { fontSize: 22, fontWeight: '900', color: '#FFFFFF', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  welcomeSub: { fontSize: 13, color: '#93C5FD', marginTop: 2 },
  cardBox: { width: '100%', maxWidth: 440, backgroundColor: 'rgba(255, 255, 255, 0.97)', borderRadius: 24, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginTop: 10, marginBottom: 8 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, backgroundColor: '#F1F5F9', padding: 4, borderRadius: 14 },
  tabPill: { flex: 1, paddingVertical: 6, alignItems: 'center', borderRadius: 10 },
  activeTabPill: { backgroundColor: '#2563EB' },
  tabText: { fontSize: 11, fontWeight: '700', color: '#64748B' },
  activeTabText: { color: '#FFFFFF', fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardEmoji: { fontSize: 28 },
  checkDot: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  checkCheck: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
  cardTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginTop: 6 },
  cardSub: { fontSize: 11, fontWeight: '500', color: '#64748B', marginTop: 2 },
});

export default ClassSelectionScreen;
