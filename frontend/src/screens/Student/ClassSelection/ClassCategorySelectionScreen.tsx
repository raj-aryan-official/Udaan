import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { AppHeader } from '../../../components/common/AppHeader/AppHeader';
import { AppCard } from '../../../components/common/AppCard/AppCard';
import {
  CarCategoryIcon,
  BookCategoryIcon,
  FlaskCategoryIcon,
  LaptopCategoryIcon,
} from '../../../components/common/Illustrations';
import { styles } from './ClassCategorySelectionScreen.styles';

export interface ClassCategorySelectionScreenProps {
  onSelectCategory?: (categoryKey: string) => void;
  onBack?: () => void;
}

export const ClassCategorySelectionScreen: React.FC<ClassCategorySelectionScreenProps> = ({
  onSelectCategory,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('0to1');

  const categories = [
    {
      key: '0to1',
      title: 'Class 0 to 1',
      subtitle: 'Nursery/Primary',
      icon: <CarCategoryIcon size={48} />,
    },
    {
      key: '2to4',
      title: 'Class 2 to 4',
      subtitle: 'Early Elementary',
      icon: <BookCategoryIcon size={48} />,
    },
    {
      key: '5to8',
      title: 'Class 5 to 8',
      subtitle: 'Middle School',
      icon: <FlaskCategoryIcon size={48} />,
    },
    {
      key: '9to10',
      title: 'Class 9 to 10',
      subtitle: 'Secondary School',
      icon: <LaptopCategoryIcon size={48} />,
    },
  ];

  const handleCardPress = (key: string) => {
    setSelectedCategory(key);
    onSelectCategory?.(key);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader onBack={onBack} showGraduationCapLogo />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.heading}>Which class are you in?</Text>
          <Text style={styles.subtitle}>Select your class to start learning.</Text>
        </View>

        <View style={styles.cardsList}>
          {categories.map((cat) => (
            <AppCard
              key={cat.key}
              selected={selectedCategory === cat.key}
              style={[styles.categoryCard, selectedCategory === cat.key && styles.categoryCardSelected]}
              onPress={() => handleCardPress(cat.key)}
            >
              {cat.icon}
              <Text style={styles.categoryTitle}>{cat.title}</Text>
              <Text style={styles.categorySubtitle}>{cat.subtitle}</Text>
            </AppCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClassCategorySelectionScreen;
