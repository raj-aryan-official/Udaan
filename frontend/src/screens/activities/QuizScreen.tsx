/**
 * Interactive Quiz Activity Screen
 * Gamified multiple-choice quiz with immediate audio/visual feedback & star rewards
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import StarCounter from '../../components/gamification/StarCounter';
import AudioPlayButton from '../../components/audio/AudioPlayButton';
import CelebrationModal from '../../components/nursery/CelebrationModal';
import { colors, layout, typography, spacing } from '../../config/theme';
import useGamification from '../../hooks/useGamification';
import soundService from '../../services/soundService';

export interface QuizScreenProps {
  activity: {
    id: string;
    title: string;
    description: string;
    subject?: string;
    questions?: Array<{
      id: string;
      question: string;
      options: string[];
      correctIndex: number;
    }>;
  };
  onBack: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  activity,
  onBack,
}: QuizScreenProps) => {
  const { completeActivity, stars } = useGamification();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const questions = activity.questions || [
    {
      id: 'q1',
      question: 'What is 5 + 3?',
      options: ['6', '7', '8', '9'],
      correctIndex: 2,
    },
    {
      id: 'q2',
      question: 'Which animal is the National Animal of India?',
      options: ['Elephant', 'Royal Bengal Tiger', 'Lion', 'Peacock'],
      correctIndex: 1,
    },
  ];

  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedIndex(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      soundService.playEffect('correct');
      setScore((prev) => prev + 10);
    } else {
      soundService.playEffect('wrong');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setIsAnswered(false);
    } else {
      // Quiz complete!
      completeActivity(activity.id, score + 10, 45);
      setShowCelebration(true);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <StarCounter count={stars} />
      </View>

      <Text style={styles.quizTitle}>{activity.title}</Text>
      <Text style={styles.progressText}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>

      {/* Question Card */}
      <Card style={styles.questionCard}>
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>{currentQ.question}</Text>
          <AudioPlayButton promptText={currentQ.question} size={40} />
        </View>
      </Card>

      {/* Options List */}
      <View style={styles.optionsContainer}>
        {currentQ.options.map((opt: string, idx: number) => {
          let btnStyle: StyleProp<ViewStyle> = styles.optionBtn;
          let textStyle: StyleProp<TextStyle> = styles.optionText;

          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              btnStyle = styles.optionCorrect;
              textStyle = styles.optionTextCorrect;
            } else if (idx === selectedIndex) {
              btnStyle = styles.optionWrong;
              textStyle = styles.optionTextWrong;
            }
          } else if (idx === selectedIndex) {
            btnStyle = styles.optionSelected;
          }

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              onPress={() => handleSelectOption(idx)}
              style={btnStyle}
            >
              <Text style={textStyle}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Next Button */}
      {isAnswered ? (
        <Button
          title={currentQuestionIndex < questions.length - 1 ? 'Next Question ➔' : 'Finish Quiz 🎉'}
          variant="secondary"
          size="large"
          onPress={handleNextQuestion}
          style={styles.nextBtn}
        />
      ) : null}

      <CelebrationModal
        visible={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          onBack();
        }}
        starsEarned={10}
        badgeTitle="Quiz Champ 🏆"
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
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  backText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: 'bold',
  },
  quizTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  questionCard: {
    backgroundColor: '#FFF9C4',
    borderColor: colors.solarYellow,
    borderWidth: 2,
    marginBottom: spacing.lg,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionText: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  optionsContainer: {
    marginBottom: spacing.lg,
  },
  optionBtn: {
    backgroundColor: colors.cardBg,
    borderWidth: 2,
    borderColor: colors.borderDark,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.xs,
    elevation: 2,
  },
  optionSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.xs,
  },
  optionCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: colors.forestGreen,
    borderWidth: 2.5,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.xs,
  },
  optionWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: colors.error,
    borderWidth: 2.5,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.xs,
  },
  optionText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  optionTextCorrect: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.forestGreen,
    textAlign: 'center',
  },
  optionTextWrong: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.error,
    textAlign: 'center',
  },
  nextBtn: {
    marginTop: spacing.md,
  },
});

export default QuizScreen;
