const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('../models/Content');
const Badge = require('../models/Badge');
const Mission = require('../models/Mission');

dotenv.config();

const sampleContent = [
  // nursery_1
  {
    subject: 'Odia',
    grade: 'Nursery',
    gradeBand: 'nursery_1',
    locale: 'or',
    type: 'activity',
    title: 'Trace Odia Alphabet - ଅ, ଆ',
    description: 'Interactive finger tracing activity for Odia alphabets',
    contentRef: 'assets/activities/nursery/odia_alphabets.json',
    rewardBase: { stars: 10, coins: 0, xp: 0 },
  },
  {
    subject: 'Mathematics',
    grade: 'Class 1',
    gradeBand: 'nursery_1',
    locale: 'or',
    type: 'activity',
    title: 'Count Rural Animals (1 to 10)',
    description: 'Tap and count cows, goats, and hens in the village farm',
    contentRef: 'assets/activities/class1/count_animals.json',
    rewardBase: { stars: 15, coins: 0, xp: 0 },
  },

  // class_2_4
  {
    subject: 'Mathematics',
    grade: 'Class 3',
    gradeBand: 'class_2_4',
    type: 'activity',
    title: 'Addition & Subtraction Village Market Challenge',
    description: 'Solve 5 quick addition questions helping shopkeeper Uncle',
    contentRef: 'assets/activities/class3/market_math.json',
    rewardBase: { stars: 15, coins: 10, xp: 0 },
  },
  {
    subject: 'Science',
    grade: 'Class 4',
    gradeBand: 'class_2_4',
    type: 'lesson',
    title: 'Plants Around Us & Leaf Types',
    description: 'Interactive story lesson on local plants in Odisha',
    contentRef: 'assets/lessons/class4/plants.json',
    rewardBase: { stars: 20, coins: 15, xp: 0 },
  },

  // class_5_8
  {
    subject: 'Science',
    grade: 'Class 6',
    gradeBand: 'class_5_8',
    type: 'quiz',
    title: 'Components of Food & Balanced Diet',
    description: 'Multiple choice quiz on proteins, vitamins, and minerals',
    contentRef: 'assets/quizzes/class6/food_science.json',
    rewardBase: { stars: 0, coins: 20, xp: 50 },
  },
  {
    subject: 'Mathematics',
    grade: 'Class 7',
    gradeBand: 'class_5_8',
    type: 'activity',
    title: 'Integers and Rational Numbers Puzzle',
    description: 'Interactive integer number line quest',
    contentRef: 'assets/activities/class7/integers.json',
    rewardBase: { stars: 0, coins: 25, xp: 60 },
  },

  // class_9_10
  {
    subject: 'Mathematics',
    grade: 'Class 10',
    gradeBand: 'class_9_10',
    type: 'quiz',
    title: 'Quadratic Equations & Real Roots',
    description: 'Board exam preparation challenge quiz on quadratic equations',
    contentRef: 'assets/quizzes/class10/quadratic_equations.json',
    rewardBase: { stars: 0, coins: 0, xp: 100 },
  },
  {
    subject: 'Science',
    grade: 'Class 10',
    gradeBand: 'class_9_10',
    type: 'lesson',
    title: 'Chemical Reactions and Equations',
    description: 'Comprehensive interactive lesson with balancing equations practice',
    contentRef: 'assets/lessons/class10/chemical_reactions.json',
    rewardBase: { stars: 0, coins: 0, xp: 120 },
  },
];

const sampleBadges = [
  {
    code: 'star_starter',
    name: 'Star Starter',
    icon: 'icon_star_starter',
    gradeBands: ['nursery_1', 'class_2_4'],
    criteria: { type: 'stars_earned', threshold: 10 },
  },
  {
    code: 'nursery_botanist',
    name: 'Little Botanist',
    icon: 'icon_sprout',
    gradeBands: ['nursery_1'],
    criteria: { type: 'activities_completed', threshold: 3 },
  },
  {
    code: 'streak_warrior_3d',
    name: '3-Day Streak Warrior',
    icon: 'icon_flame_3',
    gradeBands: ['class_2_4', 'class_5_8', 'class_9_10'],
    criteria: { type: 'streak_days', threshold: 3 },
  },
  {
    code: 'quiz_master_5',
    name: 'Quiz Master',
    icon: 'icon_trophy',
    gradeBands: ['class_5_8', 'class_9_10'],
    criteria: { type: 'quizzes_mastered', threshold: 5 },
  },
  {
    code: 'class10_milestone',
    name: 'Board Scholar',
    icon: 'icon_scholar',
    gradeBands: ['class_9_10'],
    criteria: { type: 'activities_completed', threshold: 5 },
  },
];

const sampleMissions = [
  {
    title: 'Daily Odia & Math Spark',
    gradeBand: 'nursery_1',
    frequency: 'daily',
    criteria: { subject: 'All', targetCount: 2 },
    bonusReward: { stars: 20, coins: 0, xp: 0 },
  },
  {
    title: 'Daily Math Challenger',
    gradeBand: 'class_2_4',
    frequency: 'daily',
    criteria: { subject: 'Mathematics', targetCount: 2 },
    bonusReward: { stars: 25, coins: 20, xp: 0 },
  },
  {
    title: 'Weekly Science Explorer',
    gradeBand: 'class_5_8',
    frequency: 'weekly',
    criteria: { subject: 'Science', targetCount: 3 },
    bonusReward: { stars: 0, coins: 50, xp: 150 },
  },
  {
    title: 'Class 10 Board Mastery Mission',
    gradeBand: 'class_9_10',
    frequency: 'weekly',
    criteria: { subject: 'All', targetCount: 5 },
    bonusReward: { stars: 0, coins: 0, xp: 300 },
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/udaan_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    await Content.deleteMany({});
    await Badge.deleteMany({});
    await Mission.deleteMany({});

    await Content.insertMany(sampleContent);
    await Badge.insertMany(sampleBadges);
    await Mission.insertMany(sampleMissions);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = {
  sampleContent,
  sampleBadges,
  sampleMissions,
};
