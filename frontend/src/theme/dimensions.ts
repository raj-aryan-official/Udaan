import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const dimensions = {
  windowWidth: width,
  windowHeight: height,
  maxContainerWidth: 440,
};
