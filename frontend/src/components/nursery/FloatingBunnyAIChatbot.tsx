import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NurseryAICompanion } from './NurseryAICompanion';

export interface FloatingBunnyAIChatbotProps {
  onRewardBonus?: (stars: number) => void;
}

export const FloatingBunnyAIChatbot: React.FC<FloatingBunnyAIChatbotProps> = ({ onRewardBonus }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chatbot Bubble Trigger Button (Just Above Bottom Tab Bar) */}
      <TouchableOpacity
        style={styles.floatingTrigger}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.85}
      >
        <Text style={{ fontSize: 24 }}>🐰</Text>
        <Text style={styles.triggerText}>Bunny AI</Text>
        <View style={styles.onlineDot} />
      </TouchableOpacity>

      {/* Bunny AI Chatbot Modal Overlay */}
      <Modal visible={isOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.chatbotCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🐰 Bunny AI Teacher</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeBtn}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>

            <NurseryAICompanion onRewardBonus={onRewardBonus} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingTrigger: {
    position: 'absolute',
    bottom: 72,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 999,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 6,
    marginRight: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chatbotCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  closeBtn: {
    padding: 4,
  },
});

export default FloatingBunnyAIChatbot;
