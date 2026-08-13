# 🌟 Udaan — Gamified Learning Platform for Rural Education

> **Problem Statement (SIH25048)**: Gamified Learning Platform for Rural Education — Govt. of Odisha  
> **Scope**: Nursery through Class 10  
> **Target Audience**: Village Students, Teachers, and One-Tap Guests under patchy rural connectivity constraints.

---

## 📌 Executive Summary

**Udaan** is a lightweight, high-impact gamified learning backend platform designed specifically for rural education in Odisha. Built with Node.js, Express, and MongoDB, it dynamically adapts gamification mechanics based on student grade bands while maintaining zero SMS costs, zero friction for first-time learners, and high operational simplicity.

---

## ✨ Key Features & Architecture Highlights

### 1. 🎓 Grade Band Adapted Gamification Engine
Instead of fragmented codebases, a **single config-driven reward engine (`grantRewards`)** dynamically keys mechanics based on student grade bands:
- **`nursery_1` (Nursery, LKG, UKG, Class 1)**: ⭐ Stars, 🌱 Plant Growth progression (`plantStage`), 🐶 Interactive Pet Mood (`petMood`), and 🎉 Celebration animations. No complex coins or XP.
- **`class_2_4` (Class 2 – Class 4)**: ⭐ Stars, 🪙 Coins, 🔥 Streaks, 🏅 Badges, 🎯 Daily Missions, Avatar Unlocks.
- **`class_5_8` (Class 5 – Class 8)**: ⚡ XP & Level ups, 🪙 Coins, 🔥 Streaks, 🏆 Scoped Leaderboards, Weekly Challenges.
- **`class_9_10` (Class 9 – Class 10)**: ⚡ XP & Level ups, 🔥 Streaks, 🎓 Milestone Academic Certificates, Scoped Leaderboards, Board Exam Preparation Missions.

### 2. ⚡ Zero-Friction One-Tap Guest Session
- First-time rural learners can explore immediately via `POST /auth/guest` without entering a phone number or password.
- Ephemeral user documents are indexed with a 48h MongoDB TTL (`expiresAt`).
- Upon registration (`POST /auth/convert-guest`), in-session stars and progress seamlessly migrate to the permanent profile without data loss.

### 3. 🔐 Affordable & Secure Mobile + PIN Auth
- Zero SMS gateway cost for daily logins using 4-digit PIN hashed via `bcrypt`.
- JWT access tokens (short-lived, 15m) + refresh tokens (long-lived, 30d).
- Clean seam (`smsProvider.js`) built for PIN resets via MSG91/Twilio.

### 4. 🏆 Privacy-Isolated Leaderboards
- Rankings (`GET /leaderboard`) are strictly scoped to **Class** or **School** levels (Class 5+).
- Prevents national ranking demotivation while fostering healthy local peer motivation.

### 5. 👩‍🏫 Teacher Progress Dashboard & Custom Missions
- Teachers view aggregated class progress (`GET /teacher/class/:id/progress`), average activity scores, star totals, and assign custom class missions (`POST /teacher/missions`).

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js (LTS) + Express |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (access & refresh tokens) + bcryptjs |
| **Validation** | express-validator |
| **Security & Limits**| helmet, cors, express-rate-limit |
| **Testing** | Jest + Supertest + MongoDB Memory Server |

---

## 📁 Repository Structure

```
.
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── API_REFERENCE.md      # Detailed REST API endpoint contracts
│   ├── src/
│   │   ├── app.js            # Express application setup
│   │   ├── config/           # DB connection & gamificationConfig rules
│   │   ├── models/           # User, GamificationProfile, Content, Badge, Mission, etc.
│   │   ├── controllers/      # Auth, User, Content, Gamification, Mission, Leaderboard, Teacher, Certificate
│   │   ├── routes/           # Express routes with express-validator middleware
│   │   ├── services/         # rewardEngine, smsProvider seam, gradeBandService
│   │   └── scripts/          # Seed script for Odisha curriculum content
│   └── tests/                # 9 Jest integration test suites (30 tests)
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ (LTS)
- **MongoDB**: Local instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default configuration:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/udaan_db
JWT_SECRET=super_secret_jwt_key_rural_education_2026
JWT_REFRESH_SECRET=super_secret_refresh_key_rural_education_2026
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
NODE_ENV=development
```

### 3. Seed Sample Curriculum & Catalog Data

Populates sample activities (Nursery to Class 10), badges, and missions:

```bash
npm run seed
```

### 4. Start Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```
API server running at: `http://localhost:5000`  
Health check: `GET http://localhost:5000/health`

---

## 🧪 Automated Testing

Run the full integration test suite (uses `mongodb-memory-server` in isolated memory):

```bash
npm test
```

Expected output:
```bash
Test Suites: 9 passed, 9 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        15.048 s
```

---

## 📜 API Endpoint Summary

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Register student/teacher with mobile & 4-digit PIN | No |
| `POST` | `/auth/login` | Login with mobile & PIN | No |
| `POST` | `/auth/guest` | Instant 1-tap guest session (48h TTL) | No |
| `POST` | `/auth/refresh` | Rotate access token | No |
| `POST` | `/auth/convert-guest` | Convert guest session to registered account | Yes |
| `GET` | `/users/me` | Fetch profile & grade band info | Yes |
| `GET` | `/content` | Filter activities/lessons (`?grade=&subject=&type=`) | Public |
| `POST` | `/activities/:id/complete` | Complete activity & trigger `grantRewards` | Yes |
| `GET` | `/gamification/me` | User reward totals, streaks, plant stage, badges | Yes |
| `GET` | `/missions/active` | Today's and this week's active missions | Yes |
| `GET` | `/leaderboard` | Class/School scoped rankings (`?scope=class|school`) | Yes (Class 5+) |
| `GET` | `/certificates/me` | Milestone academic certificates | Yes (Class 9-10) |
| `GET` | `/teacher/class/:id/progress` | Teacher progress dashboard | Yes (Teacher) |
| `POST` | `/teacher/missions` | Assign teacher custom mission | Yes (Teacher) |

For complete payload contracts, refer to [API_REFERENCE.md](file:///Users/krrishbiswas/Desktop/Udaan/backend/API_REFERENCE.md).

---

## 🤝 Git Commit Discipline

Every commit follows Conventional Commits specification:
- `feat(scope): message`
- `fix(scope): message`
- `chore(scope): message`
- `docs(scope): message`

Scopes: `auth`, `user`, `content`, `gamification`, `mission`, `leaderboard`, `teacher`, `certificate`, `infra`.

---

## 📄 License
Developed for Smart India Hackathon (SIH25048) — Govt. of Odisha Rural Education Initiative.