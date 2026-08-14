import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { NurseryBirdHeroAvatar } from '../common/Illustrations';

export interface NurseryAICompanionProps {
  onRewardBonus?: (stars: number) => void;
}

export const NurseryAICompanion: React.FC<NurseryAICompanionProps> = ({ onRewardBonus }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: "Hello! I'm Bunny AI 🐰. Ask me anything or tap a question below!" },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const quickPrompts = [
    { text: '🎵 Sing a Rhyme', answer: 'Twinkle twinkle little star, how I wonder what you are! Up above the world so high, like a diamond in the sky! ⭐' },
    { text: '🌈 Why is sky blue?', answer: 'The sunlight scatters through tiny particles in the air, blue light travels in smaller waves, making the sky look blue! 🌤️' },
    { text: '🐶 Dog Sound?', answer: 'Dogs say Woof Woof! Puppies love to wag their tails and play! 🐕' },
    { text: '🔢 Count 1 to 5', answer: 'One 1️⃣, Two 2️⃣, Three 3️⃣, Four 4️⃣, Five 5️⃣! Great job counting with me!' },
    { text: '🎉 Praise Me!', answer: 'You are a Super Scholar! Keep learning and growing your plant! 🌱⭐' },
  ];

  const speakText = (text: string) => {
    if (Platform.OS === 'web' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1.2;
        utterance.rate = 0.95;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.log('Speech error:', e);
      }
    }
  };

  const handlePromptSelect = (prompt: { text: string; answer: string }) => {
    const newMsgs = [
      ...messages,
      { sender: 'user' as const, text: prompt.text },
      { sender: 'ai' as const, text: prompt.answer },
    ];
    setMessages(newMsgs);
    speakText(prompt.answer);
    onRewardBonus?.(2);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userQ = inputText.trim();
    setInputText('');

    let aiAns = `That is a wonderful question about "${userQ}"! Keep asking and learning with Bunny AI! ⭐`;
    if (userQ.toLowerCase().includes('hello') || userQ.toLowerCase().includes('hi')) {
      aiAns = 'Hi there, little friend! Ready to learn and play today? 🌟';
    } else if (userQ.toLowerCase().includes('cat')) {
      aiAns = 'Cats say Meow Meow! They love milk and play with yarn! 🐱';
    } else if (userQ.toLowerCase().includes('star')) {
      aiAns = 'Stars twinkle in the night sky! Every activity you finish gives you golden stars! ⭐';
    }

    const updated = [
      ...messages,
      { sender: 'user' as const, text: userQ },
      { sender: 'ai' as const, text: aiAns },
    ];
    setMessages(updated);
    speakText(aiAns);
    onRewardBonus?.(2);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <NurseryBirdHeroAvatar size={48} />
        <View style={styles.headerText}>
          <Text style={styles.title}>Bunny AI Teacher 🐰</Text>
          <Text style={styles.subtitle}>{isSpeaking ? '🔊 Speaking to you...' : 'Tap or ask me anything!'}</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent} showsVerticalScrollIndicator={false}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.bubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={[msg.sender === 'user' ? styles.userText : styles.aiText]}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Quick Prompts for Kids */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickPromptsList}>
        {quickPrompts.map((p, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.promptPill}
            onPress={() => handlePromptSelect(p)}
          >
            <Text style={styles.promptText}>{p.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input Field */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask Bunny AI..."
          placeholderTextColor="#94A3B8"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <Path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: '#E0E7FF',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  subtitle: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '500',
  },
  chatArea: {
    maxHeight: 140,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  chatContent: {
    paddingBottom: 6,
  },
  bubble: {
    padding: 10,
    borderRadius: 14,
    marginBottom: 8,
    maxWidth: '85%',
  },
  aiBubble: {
    backgroundColor: '#EEF2FF',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#4F46E5',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  aiText: {
    color: '#312E81',
    fontSize: 14,
    fontWeight: '500',
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  quickPromptsList: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  promptPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  promptText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78350F',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1E293B',
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
