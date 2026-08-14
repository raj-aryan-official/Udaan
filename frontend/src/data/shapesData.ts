export interface ShapeItem {
  id: string;
  name: string;
  description: string;
  sides: number;
  color_suggestion: string;
  colorHex: string;
  funFact: string;
  svgType: 'circle' | 'square' | 'triangle' | 'star' | 'rectangle' | 'heart' | 'diamond' | 'oval' | 'pentagon' | 'hexagon';
}

export const NURSERY_SHAPES_DATA: ShapeItem[] = [
  {
    id: '1',
    name: 'Circle',
    description: 'Round with no corners, it goes round and round!',
    sides: 0,
    color_suggestion: 'Red',
    colorHex: '#EF4444',
    funFact: 'Coins, wheels, and full moons are all circles!',
    svgType: 'circle',
  },
  {
    id: '2',
    name: 'Square',
    description: 'Four equal sides and four straight corners.',
    sides: 4,
    color_suggestion: 'Blue',
    colorHex: '#3B82F6',
    funFact: 'Chess boards and window panes are squares!',
    svgType: 'square',
  },
  {
    id: '3',
    name: 'Triangle',
    description: 'Three pointy sides and three corners.',
    sides: 3,
    color_suggestion: 'Green',
    colorHex: '#10B981',
    funFact: 'Pizza slices and party hats are triangles!',
    svgType: 'triangle',
  },
  {
    id: '4',
    name: 'Star',
    description: 'Five pointy arms shining bright in the night sky.',
    sides: 10,
    color_suggestion: 'Yellow',
    colorHex: '#F59E0B',
    funFact: 'Starfish in the ocean look like stars!',
    svgType: 'star',
  },
  {
    id: '5',
    name: 'Rectangle',
    description: 'Four sides with two long sides and two short sides.',
    sides: 4,
    color_suggestion: 'Purple',
    colorHex: '#8B5CF6',
    funFact: 'Doors, books, and smartphones are rectangles!',
    svgType: 'rectangle',
  },
  {
    id: '6',
    name: 'Heart',
    description: 'Two rounded curves at the top that meet at a point below.',
    sides: 0,
    color_suggestion: 'Pink',
    colorHex: '#EC4899',
    funFact: 'Heart shapes represent love and care!',
    svgType: 'heart',
  },
  {
    id: '7',
    name: 'Diamond',
    description: 'Four tilted equal sides forming a pointy kite shape.',
    sides: 4,
    color_suggestion: 'Orange',
    colorHex: '#F97316',
    funFact: 'Kites flying in the sky are diamond shapes!',
    svgType: 'diamond',
  },
  {
    id: '8',
    name: 'Oval',
    description: 'Stretched circle shape like a smooth egg.',
    sides: 0,
    color_suggestion: 'Teal',
    colorHex: '#14B8A6',
    funFact: 'Watermelons and eggs are oval shapes!',
    svgType: 'oval',
  },
  {
    id: '9',
    name: 'Pentagon',
    description: 'Five equal sides like a little house.',
    sides: 5,
    color_suggestion: 'Indigo',
    colorHex: '#6366F1',
    funFact: 'The pattern on a soccer ball has pentagons!',
    svgType: 'pentagon',
  },
  {
    id: '10',
    name: 'Hexagon',
    description: 'Six straight sides and six corners.',
    sides: 6,
    color_suggestion: 'Amber',
    colorHex: '#D97706',
    funFact: 'Honeybees build honeycomb cells shaped like hexagons!',
    svgType: 'hexagon',
  },
];
