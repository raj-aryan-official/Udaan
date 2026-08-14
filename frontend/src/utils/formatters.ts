/**
 * Formatting Utilities for Numbers, Stars, Mobile Numbers and Dates
 * Udaan — Rural Education Platform
 */

export function formatStarCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

export function formatCoinCount(count: number): string {
  return formatStarCount(count);
}

export function formatXP(xp: number): string {
  return `${xp} XP`;
}

export function formatStreak(days: number): string {
  if (days <= 0) return '0 Days';
  if (days === 1) return '1 Day 🔥';
  return `${days} Days 🔥`;
}

export function formatMobileNumber(mobile: string): string {
  const cleaned = mobile.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return mobile;
}

export function formatDate(dateString?: string | Date): string {
  if (!dateString) return '';
  const d = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
