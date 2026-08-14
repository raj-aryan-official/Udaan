export interface NatureWorldItem {
  id: string;
  name: string;
  category: 'animals' | 'birds' | 'fruits' | 'nature';
  description: string;
  emoji: string;
  colorHex: string;
  funFact: string;
  soundName?: string;
}

export const NATURE_WORLD_DATA: Record<'animals' | 'birds' | 'fruits' | 'nature', NatureWorldItem[]> = {
  animals: [
    { id: 'a1', name: 'Lion', category: 'animals', description: 'King of the jungle with a grand mane! Roar!', emoji: '🦁', colorHex: '#D97706', funFact: 'A lion roar can be heard 8 kilometers away!' },
    { id: 'a2', name: 'Elephant', category: 'animals', description: 'Giant animal with a long trunk and big ears!', emoji: '🐘', colorHex: '#64748B', funFact: 'Elephants use their trunk to breathe, drink, and grab food!' },
    { id: 'a3', name: 'Tiger', category: 'animals', description: 'National animal of India with bold black stripes!', emoji: '🐯', colorHex: '#EA580C', funFact: 'No two tigers have the exact same stripes!' },
    { id: 'a4', name: 'Cow', category: 'animals', description: 'Gentle farm animal that gives us fresh milk! Moo!', emoji: '🐄', colorHex: '#16A34A', funFact: 'Cows love eating fresh green grass!' },
    { id: 'a5', name: 'Dog', category: 'animals', description: 'Loyal pet and human best friend! Woof woof!', emoji: '🐶', colorHex: '#F59E0B', funFact: 'Dogs have an incredible sense of smell!' },
    { id: 'a6', name: 'Cat', category: 'animals', description: 'Cute furry friend that purrs and catches mice! Meow!', emoji: '🐱', colorHex: '#EC4899', funFact: 'Cats can jump up to 6 times their height!' },
    { id: 'a7', name: 'Bear', category: 'animals', description: 'Big fluffy animal that loves honey and fish!', emoji: '🐻', colorHex: '#78350F', funFact: 'Bears sleep all winter during hibernation!' },
    { id: 'a8', name: 'Monkey', category: 'animals', description: 'Playful animal that swings on tree branches!', emoji: '🐵', colorHex: '#B45309', funFact: 'Monkeys use their tails for balance when jumping!' },
  ],
  birds: [
    { id: 'b1', name: 'Peacock', category: 'birds', description: 'National bird of India with gorgeous colorful feathers!', emoji: '🦚', colorHex: '#0284C7', funFact: 'Peacocks dance gracefully when rain comes!' },
    { id: 'b2', name: 'Parrot', category: 'birds', description: 'Bright green bird with a red beak that can mimic words!', emoji: '🦜', colorHex: '#16A34A', funFact: 'Parrots can learn to speak human words!' },
    { id: 'b3', name: 'Eagle', category: 'birds', description: 'Majestic bird of prey flying high in the sky!', emoji: '🦅', colorHex: '#B45309', funFact: 'Eagles have super sharp eyesight to spot prey!' },
    { id: 'b4', name: 'Owl', category: 'birds', description: 'Wise nocturnal bird with big round eyes!', emoji: '🦉', colorHex: '#78350F', funFact: 'Owls can turn their heads almost all the way around!' },
    { id: 'b5', name: 'Flamingo', category: 'birds', description: 'Tall pink bird that stands gracefully on one leg!', emoji: '🦩', colorHex: '#EC4899', funFact: 'Flamingos get their pink color from eating algae and shrimp!' },
    { id: 'b6', name: 'Duck', category: 'birds', description: 'Water bird that quacks and swims in ponds! Quack quack!', emoji: '🦆', colorHex: '#06B6D4', funFact: 'Duck feathers are waterproof to keep them dry!' },
    { id: 'b7', name: 'Swan', category: 'birds', description: 'Beautiful white bird gliding gracefully across lakes!', emoji: '🦢', colorHex: '#38BDF8', funFact: 'Swans fly together in long V-shaped formations!' },
  ],
  fruits: [
    { id: 'f1', name: 'Mango', category: 'fruits', description: 'King of fruits! Sweet, juicy, and delicious yellow fruit!', emoji: '🥭', colorHex: '#F59E0B', funFact: 'Mango is the national fruit of India!' },
    { id: 'f2', name: 'Apple', category: 'fruits', description: 'Crunchy red fruit that keeps the doctor away!', emoji: '🍎', colorHex: '#EF4444', funFact: 'There are over 7,500 varieties of apples in the world!' },
    { id: 'f3', name: 'Banana', category: 'fruits', description: 'Sweet yellow fruit packed with healthy energy!', emoji: '🍌', colorHex: '#EAB308', funFact: 'Bananas naturally grow pointing up towards the sun!' },
    { id: 'f4', name: 'Watermelon', category: 'fruits', description: 'Huge refreshing green melon with juicy red inside!', emoji: '🍉', colorHex: '#10B981', funFact: 'Watermelon is 92% water, perfect for summer!' },
    { id: 'f5', name: 'Grapes', category: 'fruits', description: 'Small round purple and green berries growing in bunches!', emoji: '🍇', colorHex: '#9333EA', funFact: 'Dried grapes are called raisins!' },
    { id: 'f6', name: 'Orange', category: 'fruits', description: 'Juicy citrus fruit rich in Vitamin C!', emoji: '🍊', colorHex: '#EA580C', funFact: 'Oranges are named after their vibrant color!' },
    { id: 'f7', name: 'Strawberry', category: 'fruits', description: 'Sweet heart-shaped red berry with seeds on the outside!', emoji: '🍓', colorHex: '#DC2626', funFact: 'Strawberry is the only fruit with seeds on the outside!' },
  ],
  nature: [
    { id: 'n1', name: 'Himalaya Mountains', category: 'nature', description: 'Snowy high mountain peaks touching the clouds!', emoji: '🏔️', colorHex: '#0284C7', funFact: 'Mount Everest in the Himalayas is the highest point on Earth!' },
    { id: 'n2', name: 'Ganga River', category: 'nature', description: 'Holy flowing river bringing life and water across India!', emoji: '🌊', colorHex: '#2563EB', funFact: 'Rivers supply fresh water for farming and animals!' },
    { id: 'n3', name: 'Green Forest', category: 'nature', description: 'Lush green trees where birds and animals live!', emoji: '🌲', colorHex: '#16A34A', funFact: 'Forests produce oxygen for us to breathe fresh air!' },
    { id: 'n4', name: 'Sun & Sky', category: 'nature', description: 'Bright glowing sun that gives light and warmth to Earth!', emoji: '☀️', colorHex: '#F59E0B', funFact: 'Sunlight helps green plants make food!' },
    { id: 'n5', name: 'Waterfall', category: 'nature', description: 'Water cascading down high mountain rocks!', emoji: '🏞️', colorHex: '#0D9488', funFact: 'Waterfalls create fresh mist and rainbow colors!' },
    { id: 'n6', name: 'Ocean & Coral Reef', category: 'nature', description: 'Vast blue sea filled with colorful fish and corals!', emoji: '🐚', colorHex: '#0284C7', funFact: 'Oceans cover more than 70% of planet Earth!' },
  ],
};
