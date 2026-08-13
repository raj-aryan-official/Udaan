const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const activityRoutes = require('./routes/activityRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const missionRoutes = require('./routes/missionRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/content', contentRoutes);
app.use('/activities', activityRoutes);
app.use('/gamification', gamificationRoutes);
app.use('/badges', badgeRoutes);
app.use('/missions', missionRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/certificates', certificateRoutes);
app.use('/teacher', teacherRoutes);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'udaan-backend',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
