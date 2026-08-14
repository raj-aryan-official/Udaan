import { UserRole } from './auth';

export type GradeBand = 'nursery_1' | 'class_2_4' | 'class_5_8' | 'class_9_10';

export interface StudentProfile {
  id: string;
  role: UserRole;
  name: string;
  mobileNumber?: string;
  grade?: string;
  gradeBand?: GradeBand;
  schoolCode?: string;
  assignedGrades?: string[];
  isGuest: boolean;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  avatar?: string;
  grade?: string;
}

export interface ProfileResponse {
  success: boolean;
  user?: StudentProfile;
  message?: string;
}
