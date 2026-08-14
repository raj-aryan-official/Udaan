/**
 * Content Catalog API Client (Lessons, Activities, Quizzes)
 * Udaan — Rural Education Platform
 */

import apiRequest from './client';

export interface ContentItem {
  _id: string;
  title: string;
  description: string;
  type: 'activity' | 'lesson' | 'quiz' | 'tracing' | 'story';
  grade: string;
  gradeBand: string;
  subject: 'Odia' | 'English' | 'Math' | 'Science' | 'General';
  iconUrl?: string;
  rewardStars: number;
  rewardCoins?: number;
  rewardXP?: number;
  estimatedMinutes?: number;
  contentData?: {
    questions?: Array<{
      questionText: string;
      options: string[];
      correctAnswerIndex: number;
      explanation?: string;
    }>;
    storyPages?: Array<{
      text: string;
      imageUrl?: string;
      audioPromptUrl?: string;
    }>;
    tracingPath?: string;
  };
}

export interface ContentFilterParams {
  grade?: string;
  gradeBand?: string;
  subject?: string;
  type?: string;
  search?: string;
}

export async function getContentListApi(params: ContentFilterParams = {}): Promise<{ contents: ContentItem[] }> {
  const query = new URLSearchParams();
  if (params.grade) query.append('grade', params.grade);
  if (params.gradeBand) query.append('gradeBand', params.gradeBand);
  if (params.subject) query.append('subject', params.subject);
  if (params.type) query.append('type', params.type);
  if (params.search) query.append('search', params.search);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<{ contents: ContentItem[] }>(`/content${queryString}`, {
    method: 'GET',
  });
}

export async function getContentByIdApi(id: string): Promise<{ content: ContentItem }> {
  return apiRequest<{ content: ContentItem }>(`/content/${id}`, {
    method: 'GET',
  });
}
