import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AudioPlayButton } from '../../components/audio/AudioPlayButton';
import { PlantGrowthWidget } from '../../components/nursery/PlantGrowthWidget';
import { PetMoodWidget } from '../../components/nursery/PetMoodWidget';

export const StoryViewerScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Odia Folk Story: The Clever Rabbit (ଚତୁର ଠେକୁଆ)</Text>
      
      <AudioPlayButton label="Play Full Audio Story (ଗଳ୍ପ ଶୁଣନ୍ତୁ)" />

      <View style={styles.storyCard}>
        <Text style={styles.storyText}>
          ଗୋଟିଏ ଜଙ୍ଗଲରେ ଏକ ଚତୁର ଠେକୁଆ ରହୁଥିଲା...
        </Text>
        <Text style={styles.storyTranslation}>
          In a peaceful forest lived a clever little rabbit who loved helping his friends.
        </Text>
      </View>

      <PlantGrowthWidget plantStage={2} />
      <PetMoodWidget petMood="joyful" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 12,
    textAlign: 'center',
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginVertical: 14,
    width: '100%',
    elevation: 3,
  },
  storyText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#4A148C',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  storyTranslation: {
    fontSize: 14,
    lineHeight: 22,
    color: '#7B1FA2',
    fontStyle: 'italic',
  },
});
