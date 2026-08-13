/**
 * Derives gradeBand from user's grade.
 * Grades:
 * - Nursery, LKG, UKG, 1 -> nursery_1
 * - 2, 3, 4 -> class_2_4
 * - 5, 6, 7, 8 -> class_5_8
 * - 9, 10 -> class_9_10
 */
const deriveGradeBand = (grade) => {
  if (!grade) return 'class_2_4'; // default fallback

  const formattedGrade = String(grade).trim().toLowerCase();

  if (['nursery', 'lkg', 'ukg', '1', 'class 1', 'class1'].includes(formattedGrade)) {
    return 'nursery_1';
  }

  const num = parseInt(formattedGrade.replace(/\D/g, ''), 10);

  if (!isNaN(num)) {
    if (num <= 1) return 'nursery_1';
    if (num >= 2 && num <= 4) return 'class_2_4';
    if (num >= 5 && num <= 8) return 'class_5_8';
    if (num >= 9 && num <= 10) return 'class_9_10';
  }

  return 'class_2_4';
};

module.exports = {
  deriveGradeBand,
};
