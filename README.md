# 🌟 Udaan — Gamified Learning Platform for Rural Education

> **Problem Statement (SIH25048)**: Gamified Learning Platform for Rural Education — Govt. of Odisha  
> **Scope**: Nursery through Class 10  
> **Target Audience**: Village Students, Teachers, and One-Tap Guests under patchy rural connectivity constraints.

---

## 📌 Executive Summary

**Udaan** is a lightweight, high-impact gamified learning platform designed specifically for rural education in Odisha. It features a **React Native cross-platform frontend** and a robust **Node.js, Express & MongoDB backend**. 

Udaan incorporates **BALA (Building As Learning Aid)** design principles for early childhood education alongside a config-driven gamification engine that dynamically adapts mechanics based on student grade bands — maintaining zero SMS costs, zero friction for first-time learners, and full offline resilience.

---

## ✨ Key Features & Architecture Highlights

### 1. 🎨 BALA (Building As Learning Aid) & Virtual Nursery Engine (Nursery - Class 2)
To foster tactile learning for young rural children with minimal digital literacy, Udaan integrates a dedicated **BALA & Virtual Nursery module**:
- **✍️ Tactile Finger Tracing (`FingerTracingScreen`)**: Interactive canvas for guided finger tracing of Odia vowels and numbers 1–10 with stroke validation and real-time star feedback.
- **🎧 Audio Folk Stories (`StoryViewerScreen` & `AudioPlayButton`)**: Odia folk stories with native text-to-speech audio voiceover, helping non-reading students learn through listening and comprehension checkups.
- **🌱 Virtual Nursery Garden (`PlantGrowthWidget`)**: Visual plant growth progression (`Seedling` ➡️ `Sprout` ➡️ `Bud` ➡️ `Blooming Flower`) that advances as students complete daily learning activities.
- **🐶 Interactive Pet Companion (`PetMoodWidget`)**: Animal companion with dynamic mood states (`Happy`, `Sleepy`, `Hungry`, `Excited`) that responds to student learning consistency.
- **🎉 Visual Celebrations (`CelebrationModal`)**: Rich celebration modals with animations when toddlers achieve milestones.

### 2. 🎓 Grade Band Adapted Gamification Engine
A single **config-driven reward engine** dynamically adjusts mechanics based on student grade bands:
- **`nursery_1` (Nursery, LKG, UKG, Class 1)**: ⭐ Stars, 🌱 Plant Growth progression (`plantStage`), 🐶 Interactive Pet Mood (`petMood`), ✍️ Finger Tracing, and 🎉 Celebration modals. No complex coins or XP.
- **`class_2_4` (Class 2 – Class 4)**: ⭐ Stars, 🪙 Coins, 🔥 Streaks, 🏅 Badges, 🎯 Daily Missions, Avatar Unlocks.
- **`class_5_8` (Class 5 – Class 8)**: ⚡ XP & Level ups, 🪙 Coins, 🔥 Streaks, 🏆 Scoped Leaderboards, Weekly Challenges.
- **`class_9_10` (Class 9 – Class 10)**: ⚡ XP & Level ups, 🔥 Streaks, 🎓 Milestone Academic Certificates, Scoped Leaderboards, Board Exam Preparation Missions.

### 3. ⚡ Zero-Friction One-Tap Guest Session
- First-time rural learners can explore immediately via `POST /auth/guest` without entering a phone number or password.
- Ephemeral user documents are indexed with a 48h MongoDB TTL (`expiresAt`).
- Upon registration (`POST /auth/convert-guest`), in-session stars and progress seamlessly migrate to the permanent profile without data loss.

### 4. 🔐 Affordable & Secure Mobile + PIN Auth
- Zero SMS gateway cost for daily logins using 4-digit PIN hashed via `bcrypt`.
- JWT access tokens (short-lived, 15m) + refresh tokens (long-lived, 30d).
- Clean seam (`smsProvider.js`) built for PIN resets via MSG91/Twilio.

### 5. 🏆 Privacy-Isolated Leaderboards
- Rankings (`GET /leaderboard`) are strictly scoped to **Class** or **School** levels (Class 5+).
- Prevents national ranking demotivation while fostering healthy local peer motivation.

### 6. 👩‍🏫 Teacher Progress Dashboard & Custom Missions
- Teachers view aggregated class progress (`GET /teacher/class/:id/progress`), average activity scores, star totals, and assign custom class missions (`POST /teacher/missions`).

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Mobile App** | React Native (0.87), TypeScript (6.0), React Native Safe Area Context |
| **BALA & Audio** | Web Speech API / TTS, Custom Canvas Touch Tracing, Custom Theme Palette |
| **Backend Runtime** | Node.js (LTS) + Express |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (access & refresh tokens) + bcryptjs |
| **Validation** | express-validator |
| **Security & Limits** | helmet, cors, express-rate-limit |
| **Testing** | Jest + Supertest + MongoDB Memory Server + React Native Testing Library |

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
├── frontend/
│   ├── package.json
│   ├── tsconfig.json         # Strict TypeScript configuration
│   ├── App.tsx               # Root component with AuthProvider & GameProvider
│   └── src/
│       ├── api/              # API clients for auth, user, content, gamification
│       ├── components/
│       │   ├── audio/        # AudioPlayButton with TTS support
│       │   ├── common/       # BigPillButton, Card, Button
│       │   ├── gamification/ # StarCounter, CoinCounter, StreakBadge, LevelBadge
│       │   └── nursery/      # PlantGrowthWidget, PetMoodWidget, CelebrationModal (BALA)
│       ├── config/           # Theme, constants, gradeBands feature flags
│       ├── context/          # AuthContext, GameContext
│       ├── hooks/            # useAuth, useGamification
│       ├── navigation/       # RootNavigator, StudentTabs, NurseryStack, TeacherTabs
│       ├── screens/
│       │   ├── activities/   # ActivityListScreen, LessonViewerScreen, QuizScreen
│       │   ├── auth/         # WelcomeScreen, LoginScreen, RegisterScreen
│       │   ├── nursery/      # NurseryHomeScreen, FingerTracingScreen, StoryViewerScreen (BALA)
│       │   ├── leaderboards/ # LeaderboardScreen
│       │   ├── missions/     # MissionsScreen
│       │   ├── profile/      # ProfileScreen, AvatarSelectorScreen
│       │   └── teacher/      # TeacherHomeScreen, ClassProgressScreen, AssignMissionScreen
│       └── services/         # soundService, storage service
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ (LTS)
- **MongoDB**: Local instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Configure PORT, MONGODB_URI, JWT secrets
npm run seed            # Seed sample Odisha curriculum & badges
npm run dev             # Starts API at http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start               # Start Metro bundler

# Run on Android / iOS
npm run android
npm run ios
```

---

## 🧪 Automated Testing

### Backend Integration Tests
```bash
cd backend
npm test
```
*Output: 9 test suites passed, 30 tests passed.*

### Frontend Type Checking
```bash
cd frontend
npx tsc --noEmit
```
*Output: 0 TypeScript errors.*

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

---

## 🤝 Git Commit Discipline & Summary

### Commit Message Specification
Every commit follows Conventional Commits specification:
- `feat(nursery/bala): message`
- `fix(nursery/bala): message`
- `chore(nursery/bala): message`
- `docs(nursery/bala): message`

Scopes: `auth`, `user`, `content`, `gamification`, `nursery`, `bala`, `mission`, `leaderboard`, `teacher`, `certificate`, `infra`.

### 📝 Recent Commit Details

#### Commit 1: `feat(nursery/bala): implement BALA Virtual Nursery & tactile learning modules`
- **Description**: Added BALA (Building As Learning Aid) module for early childhood learners (Nursery to Class 2).
- **Key Modules Added**:
  - `NurseryHomeScreen`: Central dashboard for Virtual Garden & Pet Companion.
  - `FingerTracingScreen`: Tactile finger-tracing canvas for Odia vowels and numbers 1–10.
  - `StoryViewerScreen`: Audio folk story viewer with TTS narration & question checks.
  - `PlantGrowthWidget`: Visual plant progression tied to activity completions (`Seedling` ➡️ `Blooming`).
  - `PetMoodWidget`: Dynamic pet mood widget (`Happy`, `Sleepy`, `Hungry`, `Excited`).
  - `CelebrationModal`: Celebration popup with animated milestone rewards.
  - `NurseryStack`: Dedicated stack navigator for nursery sub-screens.

#### Commit 2: `fix(frontend/types): resolve grade parameter types and nursery stack navigation`
- **Description**: Fixed TypeScript compilation errors across `AuthContext`, `StudentTabs`, `QuizScreen`, and `tsconfig.json`.
- **Changes**:
  - `gradeBands.ts`: Allowed `string | number | undefined` in `getGradeBandFromGrade` and `isFeatureEnabled`.
  - `StudentTabs.tsx`: Integrated `NurseryStack` for full sub-navigation into finger tracing and audio stories.
  - `QuizScreen.tsx`: Added explicit `StyleProp`, `ViewStyle`, and `TextStyle` type annotations.
  - `tsconfig.json`: Installed `@types/babel__*` packages and added `"types": ["jest"]`.

---

## 📄 License
Developed for Smart India Hackathon (SIH25048) — Govt. of Odisha Rural Education Initiative.