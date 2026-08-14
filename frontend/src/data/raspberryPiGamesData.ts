export interface RaspberryPiGameItem {
  id: string;
  title: string;
  category: 'Scratch Games' | 'Python Coding' | 'Web & HTML' | 'Robotics';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  emoji: string;
  colorHex: string;
  projectUrl: string;
  playEmbedUrl: string;
  learningGoal: string;
}

export const RASPBERRY_PI_GAMES_CATALOG: RaspberryPiGameItem[] = [
  {
    id: 'game-1',
    title: 'Space Junk Hunt 🚀',
    category: 'Scratch Games',
    difficulty: 'Beginner',
    description: 'Fly a spaceship to collect space debris and clean up the galaxy!',
    emoji: '🚀',
    colorHex: '#3B82F6',
    projectUrl: 'https://projects.raspberrypi.org/en/projects/space-junk',
    playEmbedUrl: 'https://scratch.mit.edu/projects/embed/399081541/?autostart=false',
    learningGoal: 'Learn sprite movement, coordinates, and collision detection.',
  },
  {
    id: 'game-2',
    title: 'Boat Race Challenge 🚤',
    category: 'Scratch Games',
    difficulty: 'Beginner',
    description: 'Steer your speed boat through obstacles to reach the finish line!',
    emoji: '🚤',
    colorHex: '#10B981',
    projectUrl: 'https://projects.raspberrypi.org/en/projects/boat-race',
    playEmbedUrl: 'https://scratch.mit.edu/projects/embed/399081541/?autostart=false',
    learningGoal: 'Master mouse controls, barriers, and timers.',
  },
  {
    id: 'game-3',
    title: 'Ghostbusters Catcher 👻',
    category: 'Scratch Games',
    difficulty: 'Beginner',
    description: 'Catch popping ghosts before time runs out to earn high scores!',
    emoji: '👻',
    colorHex: '#8B5CF6',
    projectUrl: 'https://projects.raspberrypi.org/en/projects/ghostbusters',
    playEmbedUrl: 'https://scratch.mit.edu/projects/embed/399081541/?autostart=false',
    learningGoal: 'Practice variables, score multipliers, and random spawning.',
  },
  {
    id: 'game-4',
    title: 'Rock Paper Scissors AI ✂️',
    category: 'Python Coding',
    difficulty: 'Intermediate',
    description: 'Build a classic Rock, Paper, Scissors game against a computer AI opponent!',
    emoji: '🎮',
    colorHex: '#F59E0B',
    projectUrl: 'https://projects.raspberrypi.org/en/projects/rock-paper-scissors',
    playEmbedUrl: 'https://projects.raspberrypi.org/en/projects/rock-paper-scissors',
    learningGoal: 'Understand conditional statements, logic, and random choice.',
  },
  {
    id: 'game-5',
    title: 'Turtle Race Animation 🐢',
    category: 'Python Coding',
    difficulty: 'Beginner',
    description: 'Program colorful turtles to race across the screen!',
    emoji: '🐢',
    colorHex: '#14B8A6',
    projectUrl: 'https://projects.raspberrypi.org/en/projects/turtle-race',
    playEmbedUrl: 'https://projects.raspberrypi.org/en/projects/turtle-race',
    learningGoal: 'Learn Python loops, turtle graphics, and random step speeds.',
  },
  {
    id: 'game-6',
    title: 'Secret Code Cipher 🔐',
    category: 'Python Coding',
    difficulty: 'Intermediate',
    description: 'Encrypt and decrypt secret messages using the famous Caesar cipher algorithm!',
    emoji: '🔐',
    colorHex: '#EC4899',
    projectUrl: 'https://projects.raspberrypi.org/en/projects/secret-messages',
    playEmbedUrl: 'https://projects.raspberrypi.org/en/projects/secret-messages',
    learningGoal: 'Explore strings, ASCII codes, and character encoding.',
  },
  {
    id: 'game-7',
    title: 'Create Your Own Poster 🎨',
    category: 'Web & HTML',
    difficulty: 'Beginner',
    description: 'Design a vibrant HTML & CSS webpage poster for an event or hobby!',
    emoji: '🖼️',
    colorHex: '#EA580C',
    projectUrl: 'https://projects.raspberrypi.org/en/projects/wanted-poster',
    playEmbedUrl: 'https://projects.raspberrypi.org/en/projects/wanted-poster',
    learningGoal: 'Master HTML tags, CSS styling, fonts, and image layouts.',
  },
  {
    id: 'game-8',
    title: 'Sense HAT Weather Station 🌤️',
    category: 'Robotics',
    difficulty: 'Advanced',
    description: 'Use sensors to display temperature, pressure, and pixel weather animations!',
    emoji: '🌤️',
    colorHex: '#0284C7',
    projectUrl: 'https://projects.raspberrypi.org/en/projects/sense-hat-random-sparkles',
    playEmbedUrl: 'https://projects.raspberrypi.org/en/projects/sense-hat-random-sparkles',
    learningGoal: 'Connect hardware sensors, read telemetry, and drive LED matrices.',
  },
];
