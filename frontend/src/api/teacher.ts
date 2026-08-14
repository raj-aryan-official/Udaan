/**
 * Teacher Dashboard & Class Analytics API Client
 * Udaan — Rural Education Platform
 */

import apiRequest from './client';

export interface StudentProgressSummary {
  studentId: string;
  name: string;
  grade: string;
  totalStars: number;
  completedActivities: number;
  lastActive: string;
}

export interface ClassProgressData {
  classId: string;
  grade: string;
  totalStudents: number;
  averageStars: number;
  averageScorePercentage: number;
  students: StudentProgressSummary[];
  recentNotes: Array<{
    id: string;
    note: string;
    createdAt: string;
  }>;
}

export interface AssignMissionPayload {
  title: string;
  description: string;
  grade: string;
  targetCount: number;
  rewardStars: number;
  deadline?: string;
}

export async function getClassProgressApi(classId: string): Promise<{ data: ClassProgressData }> {
  return apiRequest<{ data: ClassProgressData }>(`/teacher/class/${classId}/progress`, {
    method: 'GET',
  });
}

export async function recordProgressNoteApi(classId: string, note: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/teacher/class/${classId}/progress`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}

export async function assignTeacherMissionApi(payload: AssignMissionPayload): Promise<{ message: string; mission: any }> {
  return apiRequest<{ message: string; mission: any }>('/teacher/missions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
