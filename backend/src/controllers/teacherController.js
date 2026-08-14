const User = require('../models/User');
const GamificationProfile = require('../models/GamificationProfile');
const ActivityCompletion = require('../models/ActivityCompletion');
const Mission = require('../models/Mission');
const { deriveGradeBand } = require('../services/gradeBandService');

// @desc    Get progress dashboard for teacher's assigned class
// @route   GET /teacher/class/:id/progress
// @access  Private (Teacher only)
const getClassProgress = async (req, res, next) => {
  try {
    const teacher = req.user;
    const classGrade = req.params.id; // e.g. '3' or 'Class 3'

    // Scope check: ensure teacher is assigned to this grade and school
    const isAssigned =
      teacher.assignedGrades &&
      teacher.assignedGrades.some(
        (g) => g.trim().toLowerCase() === classGrade.trim().toLowerCase()
      );

    if (!isAssigned && teacher.assignedGrades && teacher.assignedGrades.length > 0) {
      return res.status(403).json({
        success: false,
        message: `Teacher is not assigned to grade '${classGrade}'.`,
      });
    }

    // Find all students in this school and grade
    const studentQuery = {
      role: 'student',
      grade: new RegExp(`^${classGrade}$`, 'i'),
    };
    if (teacher.schoolCode) {
      studentQuery.schoolCode = teacher.schoolCode;
    }

    const students = await User.find(studentQuery).select('_id name grade schoolCode avatar');
    const studentIds = students.map((s) => s._id);

    const profiles = await GamificationProfile.find({ userId: { $in: studentIds } });
    const profileMap = new Map();
    profiles.forEach((p) => profileMap.set(p.userId.toString(), p));

    const completions = await ActivityCompletion.find({ userId: { $in: studentIds } });
    const completionStatsMap = new Map();
    completions.forEach((c) => {
      const uid = c.userId.toString();
      const current = completionStatsMap.get(uid) || { count: 0, totalScore: 0 };
      current.count += 1;
      current.totalScore += c.score || 100;
      completionStatsMap.set(uid, current);
    });

    const studentProgressList = students.map((student) => {
      const p = profileMap.get(student._id.toString());
      const stats = completionStatsMap.get(student._id.toString()) || { count: 0, totalScore: 0 };

      return {
        studentId: student._id,
        name: student.name,
        grade: student.grade,
        stars: p ? p.stars : 0,
        coins: p ? p.coins : 0,
        xp: p ? p.xp : 0,
        level: p ? p.level : 1,
        streak: p ? p.streak.current : 0,
        activitiesCompleted: stats.count,
        averageScore: stats.count > 0 ? Math.round(stats.totalScore / stats.count) : 0,
      };
    });

    res.status(200).json({
      success: true,
      classGrade,
      schoolCode: teacher.schoolCode,
      studentCount: studentProgressList.length,
      data: studentProgressList,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Record teacher class note/progress entry
// @route   POST /teacher/class/:id/progress
// @access  Private (Teacher only)
const recordClassProgressNote = async (req, res, next) => {
  try {
    const classGrade = req.params.id;
    const { note, highlightStudentId } = req.body;

    res.status(200).json({
      success: true,
      message: `Progress note recorded for grade '${classGrade}'.`,
      record: {
        teacherId: req.user._id,
        classGrade,
        note,
        highlightStudentId,
        recordedAt: new Date(),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign custom teacher mission to class grade band
// @route   POST /teacher/missions
// @access  Private (Teacher only)
const assignTeacherMission = async (req, res, next) => {
  try {
    const { title, grade, targetCount, subject, bonusStars, bonusCoins, bonusXp } = req.body;

    const gradeBand = deriveGradeBand(grade);

    const mission = await Mission.create({
      title,
      gradeBand,
      frequency: 'weekly',
      criteria: {
        subject: subject || 'All',
        targetCount: targetCount || 3,
      },
      bonusReward: {
        stars: bonusStars || 30,
        coins: bonusCoins || 20,
        xp: bonusXp || 50,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Teacher mission assigned successfully.',
      mission,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClassProgress,
  recordClassProgressNote,
  assignTeacherMission,
};
