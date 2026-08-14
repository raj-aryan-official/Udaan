/**
 * Certificates & Achievements Screen
 * Displays earned downloadable learning certificates for rural students
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { colors, layout, typography, spacing } from '../../config/theme';

export interface CertificatesScreenProps {
  onBack: () => void;
}

export const CertificatesScreen: React.FC<CertificatesScreenProps> = ({
  onBack,
}: CertificatesScreenProps) => {
  const certs = [
    {
      id: 'c1',
      title: 'Odia Alphabet Mastery Certificate',
      date: '10 Aug 2025',
      issuer: 'Odisha School Education Authority',
    },
    {
      id: 'c2',
      title: 'Basic Mathematics & Counting 1-10',
      date: '02 Aug 2025',
      issuer: 'Udaan Rural Learning Program',
    },
  ];

  const renderCertCard = ({ item }: ListRenderItemInfo<any>) => (
    <Card style={styles.certCard}>
      <Text style={styles.certEmoji}>📜</Text>
      <View style={styles.info}>
        <Text style={styles.certTitle}>{item.title}</Text>
        <Text style={styles.certSub}>Issued by {item.issuer}</Text>
        <Text style={styles.certDate}>Date: {item.date}</Text>

        <Button
          title="Download PDF 📥"
          variant="outline"
          size="small"
          onPress={() => {}}
          style={styles.downloadBtn}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Certificates 📜</Text>
      </View>

      <FlatList
        data={certs}
        keyExtractor={(item) => item.id}
        renderItem={renderCertCard}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
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
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  listContent: {
    padding: spacing.md,
  },
  certCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    backgroundColor: '#FFFDE7',
    borderColor: colors.solarYellow,
    borderWidth: 2,
  },
  certEmoji: {
    fontSize: 40,
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  certTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  certSub: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  certDate: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  downloadBtn: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
});

export default CertificatesScreen;
