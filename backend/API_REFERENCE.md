# API Reference — Gamified Learning Platform for Rural Education (SIH25048)

**Govt. of Odisha | Scope: Nursery through Class 10**

Base URL: `http://localhost:5000` (or `process.env.PORT`)

---

## 1. Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register new student or teacher with mobile & 4-digit PIN | No |
| `POST` | `/auth/login` | Login with mobile & PIN → returns JWT access & refresh tokens | No |
| `POST` | `/auth/guest` | Instant one-tap guest session (48h TTL) | No |
| `POST` | `/auth/refresh` | Rotate access token using valid refresh token | No |
| `POST` | `/auth/pin-reset/request-otp` | Request PIN reset OTP via SMS seam (`smsProvider.js`) | No |
| `POST` | `/auth/pin-reset/verify` | Verify OTP and reset PIN | No |
| `POST` | `/auth/convert-guest` | Migrate guest session to permanent registered user preserving rewards | Yes (Guest) |

---

## 2. User Profile (`/users`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/users/me` | Retrieve current user profile | Yes |
| `PATCH` | `/users/me` | Update user profile (name, avatar, grade with auto `gradeBand` recalculation) | Yes |

---

## 3. Content Catalog (`/content`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/content` | Filter activities/lessons/quizzes (`?grade=&gradeBand=&subject=&type=`) | No / Optional |
| `GET` | `/content/:id` | Get single content item by ID | No / Optional |

---

## 4. Gamification Engine & Activities (`/activities` & `/gamification`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/activities/:id/complete` | Complete activity → triggers central `grantRewards` engine | Yes |
| `GET` | `/gamification/me` | Fetch user rewards, stars, coins, xp, level, streak, badges, plantStage, petMood | Yes |
| `GET` | `/badges` | Fetch badge catalog (`?gradeBand=`) | No / Optional |

---

## 5. Missions (`/missions`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/missions/active` | Today's and this week's active grade-band missions with user progress | Yes |

---

## 6. Leaderboards (`/leaderboard`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/leaderboard` | Class or school scoped rankings (`?scope=class|school&type=top|improved|consistent|quiz`) | Yes (Class 5+) |

---

## 7. Milestone Certificates (`/certificates`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/certificates/me` | Retrieve earned milestone certificates | Yes (Class 9-10) |

---

## 8. Teacher Dashboard & Tools (`/teacher`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/teacher/class/:id/progress` | Teacher progress dashboard scoped to school & assigned grade | Yes (Teacher) |
| `POST` | `/teacher/class/:id/progress` | Record teacher progress note for class | Yes (Teacher) |
| `POST` | `/teacher/missions` | Assign custom teacher mission for class | Yes (Teacher) |

---

## Grade Band Unlocks Matrix

| Grade Band | Target Cohort | Enabled Mechanics |
|---|---|---|
| `nursery_1` | Nursery, LKG, UKG, Class 1 | Stars, Badges, Plant Growth, Pet Mood, Celebration animations |
| `class_2_4` | Class 2, 3, 4 | Stars, Coins, Badges, Streaks, Daily Missions, Avatar Unlocks |
| `class_5_8` | Class 5, 6, 7, 8 | XP, Levels, Coins, Badges, Streaks, Weekly Missions, Scoped Leaderboards |
| `class_9_10` | Class 9, 10 | XP, Levels, Badges, Streaks, Weekly Missions, Scoped Leaderboards, Milestone Certificates |
