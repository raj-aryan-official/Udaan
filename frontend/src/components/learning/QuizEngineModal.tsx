import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BunnyLogoBadge } from '../common/Illustrations';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  id: string;
  title: string;
  grade: string;
  category: string;
  questions: QuizQuestion[];
}

export const ALL_CLASS_QUIZZES_REGISTRY: Record<string, QuizData> = {
  nursery: {
    id: 'quiz-nursery',
    title: 'Nursery Animal Sounds & Colors Quiz',
    grade: 'Nursery',
    category: 'Early Foundational',
    questions: [
      { question: 'What sound does a Cow make?', options: ['Meow Meow', 'Moo Moo', 'Woof Woof', 'Quack Quack'], correctIndex: 1, explanation: 'Cows say Moo Moo!' },
      { question: 'What letter does Apple start with?', options: ['B', 'C', 'A', 'D'], correctIndex: 2, explanation: 'A is for Apple!' },
      { question: 'What color is the Sun in the sky?', options: ['Blue', 'Yellow', 'Green', 'Purple'], correctIndex: 1, explanation: 'The Sun is bright yellow!' },
      { question: 'Who went up the hill to fetch a pail of water?', options: ['Jack and Jill', 'Humpty Dumpty', 'Little Bo Peep', 'Ba Ba Black Sheep'], correctIndex: 0, explanation: 'Jack and Jill went up the hill!' },
    ],
  },
  class1: {
    id: 'quiz-class1',
    title: 'Class 1 Counting & Shapes Quiz',
    grade: 'Class 1',
    category: 'Mathematics & Colors',
    questions: [
      { question: 'How many apples are here: 🍎🍎🍎?', options: ['2', '3', '4', '5'], correctIndex: 1, explanation: 'Count them: 1, 2, 3 apples!' },
      { question: 'Which shape has 3 pointy corners?', options: ['Circle', 'Square', 'Triangle', 'Star'], correctIndex: 2, explanation: 'Triangles have 3 corners!' },
      { question: 'What is 1 cat + 2 cats?', options: ['2 cats', '3 cats', '4 cats', '5 cats'], correctIndex: 1, explanation: '1 + 2 = 3 cats!' },
      { question: 'What color is a fresh leaf?', options: ['Red', 'Blue', 'Green', 'Pink'], correctIndex: 2, explanation: 'Leaves are green!' },
    ],
  },
  class2: {
    id: 'quiz-class2',
    title: 'Class 2 Addition & Grammar Quiz',
    grade: 'Class 2',
    category: 'Mathematics & English',
    questions: [
      { question: 'What is 15 + 10?', options: ['20', '25', '30', '35'], correctIndex: 1, explanation: '15 + 10 = 25!' },
      { question: 'What is 20 - 8?', options: ['10', '12', '14', '16'], correctIndex: 1, explanation: '20 - 8 = 12!' },
      { question: 'Which word is a Noun (Name of a place)?', options: ['Run', 'Delhi', 'Quickly', 'Blue'], correctIndex: 1, explanation: 'Delhi is a city name, so it is a Noun!' },
      { question: 'Where do fish live?', options: ['In Trees', 'In Water', 'In Sky', 'In Desert'], correctIndex: 1, explanation: 'Fish live in water!' },
    ],
  },
  class3: {
    id: 'quiz-class3',
    title: 'Class 3 Multiplication & Market Math Quiz',
    grade: 'Class 3',
    category: 'Mathematics & Time',
    questions: [
      { question: 'What is 4 × 5?', options: ['15', '20', '25', '30'], correctIndex: 1, explanation: '4 × 5 = 20!' },
      { question: 'How many minutes are in 1 hour?', options: ['30', '45', '60', '100'], correctIndex: 2, explanation: '60 minutes = 1 hour!' },
      { question: 'If 1 notebook costs ₹10, how much do 3 notebooks cost?', options: ['₹20', '₹30', '₹40', '₹50'], correctIndex: 1, explanation: '3 × ₹10 = ₹30!' },
      { question: 'Which part of a plant grows under the soil?', options: ['Leaf', 'Flower', 'Roots', 'Stem'], correctIndex: 2, explanation: 'Roots grow under soil!' },
    ],
  },
  class4: {
    id: 'quiz-class4',
    title: 'Class 4 EVS Science & Solar System Quiz',
    grade: 'Class 4',
    category: 'EVS & Fractions',
    questions: [
      { question: 'Which gas do green leaves release during photosynthesis?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Helium'], correctIndex: 1, explanation: 'Plants release oxygen gas!' },
      { question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correctIndex: 2, explanation: 'Mars is known as the Red Planet!' },
      { question: 'What is 1/2 of 50?', options: ['15', '20', '25', '30'], correctIndex: 2, explanation: 'Half of 50 is 25!' },
      { question: 'Which of the following is an Action Verb?', options: ['Jump', 'Table', 'Red', 'Happy'], correctIndex: 0, explanation: 'Jump is an action verb!' },
    ],
  },
  class5: {
    id: 'quiz-class5',
    title: 'Class 5 Decimals & Digestion Quiz',
    grade: 'Class 5',
    category: 'Mathematics & Science',
    questions: [
      { question: 'What is 0.5 as a fraction in lowest form?', options: ['1/4', '1/2', '3/4', '2/5'], correctIndex: 1, explanation: '0.5 = 5/10 = 1/2!' },
      { question: 'Where does food digestion start in the human body?', options: ['Stomach', 'Small Intestine', 'Mouth', 'Liver'], correctIndex: 2, explanation: 'Digestion begins in the mouth with saliva!' },
      { question: 'What is the national river of India?', options: ['Yamuna', 'Ganga', 'Narmada', 'Kaveri'], correctIndex: 1, explanation: 'Ganga is the national river of India!' },
      { question: 'A Right Angle is equal to how many degrees?', options: ['45°', '90°', '180°', '360°'], correctIndex: 1, explanation: 'A right angle is exactly 90°!' },
    ],
  },
  class6: {
    id: 'quiz-class6',
    title: 'Class 6 Components of Food & Ratios Quiz',
    grade: 'Class 6',
    category: 'Science & Mathematics',
    questions: [
      { question: 'Which nutrient is essential for body growth and muscle repair?', options: ['Carbohydrates', 'Fats', 'Proteins', 'Roughage'], correctIndex: 2, explanation: 'Proteins build and repair body tissues!' },
      { question: 'Scurvy is caused by deficiency of which vitamin?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], correctIndex: 2, explanation: 'Vitamin C deficiency causes scurvy!' },
      { question: 'Simplify the ratio 4:8 to simplest form:', options: ['1:2', '2:3', '1:4', '2:5'], correctIndex: 0, explanation: '4:8 divides by 4 = 1:2!' },
      { question: 'Which ancient civilization developed along the Indus River?', options: ['Vedic Civilization', 'Indus Valley Civilization', 'Mauryan Empire', 'Gupta Empire'], correctIndex: 1, explanation: 'The Indus Valley Civilization flourished along the Indus River!' },
    ],
  },
  class7: {
    id: 'quiz-class7',
    title: 'Class 7 Integers & Chemistry Acids Quiz',
    grade: 'Class 7',
    category: 'Mathematics & Chemistry',
    questions: [
      { question: 'What is (-12) + 15?', options: ['-3', '3', '-27', '27'], correctIndex: 1, explanation: '(-12) + 15 = 3!' },
      { question: 'If 3x = 21, what is the value of x?', options: ['5', '6', '7', '8'], correctIndex: 2, explanation: 'x = 21 / 3 = 7!' },
      { question: 'Acids turn Blue Litmus paper into what color?', options: ['Green', 'Red', 'Yellow', 'Purple'], correctIndex: 1, explanation: 'Acids turn blue litmus paper RED!' },
      { question: 'Heat flows spontaneously from a body at higher temperature to...', options: ['Same Temperature', 'Lower Temperature', 'Higher Temperature', 'Vacuum'], correctIndex: 1, explanation: 'Heat flows from higher to lower temperature!' },
    ],
  },
  class8: {
    id: 'quiz-class8',
    title: 'Class 8 Physics Light & Cell Science Quiz',
    grade: 'Class 8',
    category: 'Physics & Biology',
    questions: [
      { question: 'The angle of incidence is always equal to the angle of...', options: ['Refraction', 'Reflection', 'Diffraction', 'Absorption'], correctIndex: 1, explanation: 'Law of reflection: Angle i = Angle r!' },
      { question: 'Which organelle is known as the Powerhouse of the Cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'], correctIndex: 2, explanation: 'Mitochondria produce cellular energy (ATP)!' },
      { question: 'Solve linear equation: 2x + 5 = 15. Value of x is:', options: ['3', '4', '5', '6'], correctIndex: 2, explanation: '2x = 10 -> x = 5!' },
      { question: 'Which metal exists in liquid state at room temperature?', options: ['Sodium', 'Mercury', 'Iron', 'Aluminum'], correctIndex: 1, explanation: 'Mercury (Hg) is a liquid metal at room temperature!' },
    ],
  },
  class9: {
    id: 'quiz-class9',
    title: 'Class 9 Laws of Motion & Algebra Quiz',
    grade: 'Class 9',
    category: 'Physics & Mathematics',
    questions: [
      { question: 'What is Newton\'s Second Law formula for force?', options: ['F = m / a', 'F = m × a', 'F = m + a', 'F = a / m'], correctIndex: 1, explanation: 'Force F = Mass × Acceleration!' },
      { question: 'Acceleration due to gravity on Earth (g) is approximately:', options: ['9.8 m/s²', '8.9 m/s²', '10.5 m/s²', '6.8 m/s²'], correctIndex: 0, explanation: 'g = 9.8 m/s² on Earth surface!' },
      { question: 'Expand algebraic identity (a + b)²:', options: ['a² + b²', 'a² + 2ab + b²', 'a² - 2ab + b²', 'a² + ab + b²'], correctIndex: 1, explanation: '(a + b)² = a² + 2ab + b²!' },
      { question: 'What is the boiling point of pure water at standard atmospheric pressure?', options: ['90°C', '100°C', '110°C', '120°C'], correctIndex: 1, explanation: 'Water boils at 100°C!' },
    ],
  },
  class10: {
    id: 'quiz-class10',
    title: 'Class 10 Board Exam Math & Chemistry Quiz',
    grade: 'Class 10',
    category: 'Board Exam Challenge',
    questions: [
      { question: 'What is the Discriminant formula for quadratic equation ax² + bx + c = 0?', options: ['b² - 4ac', 'b² + 4ac', '-b ± √D', '4ac - b²'], correctIndex: 0, explanation: 'Discriminant D = b² - 4ac!' },
      { question: 'If Discriminant D > 0, the roots of quadratic equation are:', options: ['Two distinct real roots', 'Two equal real roots', 'No real roots', 'Imaginary roots'], correctIndex: 0, explanation: 'When D > 0, there are two distinct real roots!' },
      { question: 'A chemical reaction in which heat is absorbed is called:', options: ['Exothermic', 'Endothermic', 'Isothermal', 'Catalytic'], correctIndex: 1, explanation: 'Endothermic reactions absorb heat energy!' },
      { question: 'According to Ohm\'s Law, Voltage V is equal to:', options: ['I / R', 'I × R', 'R / I', 'I + R'], correctIndex: 1, explanation: 'Ohm\'s Law: V = I × R!' },
    ],
  },
};

export interface QuizEngineModalProps {
  visible: boolean;
  quiz?: QuizData | null;
  selectedClass?: string;
  onClose: () => void;
  onCompleteQuiz: (scorePercent: number, starsEarned: number) => void;
}

export const QuizEngineModal: React.FC<QuizEngineModalProps> = ({
  visible,
  quiz,
  selectedClass = 'nursery',
  onClose,
  onCompleteQuiz,
}) => {
  const activeQuiz = quiz || ALL_CLASS_QUIZZES_REGISTRY[selectedClass] || ALL_CLASS_QUIZZES_REGISTRY.nursery;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (visible) {
      setCurrentIndex(0);
      setSelectedOption(null);
      setScore(0);
      setIsCompleted(false);
    }
  }, [visible, selectedClass, quiz]);

  if (!activeQuiz) return null;

  const currentQuestion = activeQuiz.questions[currentIndex];

  const handleOptionPress = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuiz.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReplay = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  const scorePercent = Math.round((score / activeQuiz.questions.length) * 100);
  const starsEarned = Math.max(1, Math.round((score / activeQuiz.questions.length) * 5));

  const handleClaim = () => {
    onCompleteQuiz(scorePercent, starsEarned);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeQuiz.grade} • {activeQuiz.category}</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <Path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>
          </View>

          {!isCompleted ? (
            <ScrollView contentContainerStyle={styles.quizBody}>
              <Text style={styles.quizTitle}>{activeQuiz.title}</Text>
              <Text style={styles.progressText}>Question {currentIndex + 1} of {activeQuiz.questions.length}</Text>

              {/* Question Text */}
              <View style={styles.questionBox}>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>
              </View>

              {/* Options */}
              <View style={styles.optionsList}>
                {currentQuestion.options.map((opt, idx) => {
                  let optStyle: any = styles.optionBtn;
                  let optTextStyle: any = styles.optionText;

                  if (selectedOption !== null) {
                    if (idx === currentQuestion.correctIndex) {
                      optStyle = [styles.optionBtn, styles.correctOption];
                      optTextStyle = [styles.optionText, styles.correctOptionText];
                    } else if (idx === selectedOption) {
                      optStyle = [styles.optionBtn, styles.wrongOption];
                      optTextStyle = [styles.optionText, styles.wrongOptionText];
                    }
                  }

                  return (
                    <TouchableOpacity
                      key={idx}
                      style={optStyle}
                      onPress={() => handleOptionPress(idx)}
                      activeOpacity={0.8}
                    >
                      <Text style={optTextStyle}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Explanation & Next */}
              {selectedOption !== null && (
                <View style={styles.explanationBox}>
                  <Text style={styles.explanationText}>💡 {currentQuestion.explanation}</Text>
                  <TouchableOpacity style={styles.nextBtn} onPress={handleNextQuestion}>
                    <Text style={styles.nextBtnText}>
                      {currentIndex + 1 < activeQuiz.questions.length ? 'Next Question ➡️' : 'View Results 🎉'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          ) : (
            /* Result Screen */
            <View style={styles.resultBody}>
              <BunnyLogoBadge size={72} />
              <Text style={styles.resultTitle}>QUIZ COMPLETED! 🎉</Text>
              <Text style={styles.resultScore}>Your Score: {score} / {activeQuiz.questions.length} ({scorePercent}%)</Text>

              <View style={styles.rewardsRow}>
                <Text style={styles.rewardItem}>⭐ +{starsEarned} Stars</Text>
                <Text style={styles.rewardItem}>🪙 +10 Coins</Text>
              </View>

              <View style={styles.resultButtonsRow}>
                <TouchableOpacity style={styles.replayBtn} onPress={handleReplay}>
                  <Text style={styles.replayBtnText}>🔄 Replay Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.claimBtn} onPress={handleClaim}>
                  <Text style={styles.claimBtnText}>Claim Rewards ⭐</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 3,
    borderColor: '#F59E0B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  quizBody: {
    paddingVertical: 8,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
    marginBottom: 14,
  },
  questionBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  optionsList: {
    marginBottom: 14,
  },
  optionBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  correctOption: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  correctOptionText: {
    color: '#15803D',
    fontWeight: '800',
  },
  wrongOption: {
    backgroundColor: '#FEE2E2',
    borderColor: '#DC2626',
  },
  wrongOptionText: {
    color: '#B91C1C',
    fontWeight: '800',
  },
  explanationBox: {
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#3B82F6',
    marginTop: 6,
  },
  explanationText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 10,
  },
  nextBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  resultBody: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#D97706',
    marginTop: 12,
  },
  resultScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginVertical: 10,
  },
  rewardsRow: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginVertical: 12,
  },
  rewardItem: {
    fontSize: 15,
    fontWeight: '800',
    color: '#78350F',
    marginHorizontal: 8,
  },
  resultButtonsRow: {
    flexDirection: 'row',
    marginTop: 16,
    width: '100%',
  },
  replayBtn: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 6,
  },
  replayBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  claimBtn: {
    flex: 1,
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginLeft: 6,
  },
  claimBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
