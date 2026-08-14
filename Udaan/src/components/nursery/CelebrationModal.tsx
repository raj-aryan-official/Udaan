import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CelebrationModalProps {
  visible: boolean;
  message?: string;
  starsEarned?: number;
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  visible,
  message = '🎉 Great job! Milestone achieved!',
  starsEarned = 10,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.confetti}>🎉 🌟 🎈 🌟 🎉</Text>
          <Text style={styles.title}>Shabash! (ଶାବାସ!)</Text>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.stars}>+ {starsEarned} ⭐ Stars</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continue Learning (ଆଗକୁ ବଢ଼)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
  },
  confetti: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#37474F',
    marginVertical: 8,
  },
  stars: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFB300',
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
