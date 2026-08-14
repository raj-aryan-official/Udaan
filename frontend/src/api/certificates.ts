/**
 * Milestone Academic Certificates API Client (Class 9 & 10)
 * Udaan — Rural Education Platform
 */

import apiRequest from './client';

export interface MilestoneCertificate {
  id: string;
  certificateNumber: string;
  title: string;
  subject: string;
  studentName: string;
  grade: string;
  issueDate: string;
  downloadUrl?: string;
  verifiedBySchool: boolean;
}

export async function getMyCertificatesApi(): Promise<{ certificates: MilestoneCertificate[] }> {
  return apiRequest<{ certificates: MilestoneCertificate[] }>('/certificates/me', {
    method: 'GET',
  });
}
