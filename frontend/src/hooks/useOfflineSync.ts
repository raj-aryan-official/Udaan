/**
 * Offline Synchronization Hook
 * Queues activity completions locally during network loss & syncs automatically when online
 * Udaan — Rural Education Platform
 */

import { useState, useEffect, useCallback } from 'react';
import storage from '../services/storage';
import { STORAGE_KEYS } from '../config/constants';
import { completeActivityApi } from '../api/gamification';

export interface QueuedActivity {
  id: string;
  activityId: string;
  score: number;
  timeSpentSeconds: number;
  timestamp: number;
}

export function useOfflineSync() {
  const [queuedItems, setQueuedItems] = useState<QueuedActivity[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const loadQueue = useCallback(async () => {
    const queue = await storage.getJSON<QueuedActivity[]>(STORAGE_KEYS.OFFLINE_QUEUE);
    setQueuedItems(queue || []);
  }, []);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  const queueActivityCompletion = useCallback(
    async (activityId: string, score: number = 100, timeSpentSeconds: number = 60) => {
      const newEntry: QueuedActivity = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        activityId,
        score,
        timeSpentSeconds,
        timestamp: Date.now(),
      };

      const existing = (await storage.getJSON<QueuedActivity[]>(STORAGE_KEYS.OFFLINE_QUEUE)) || [];
      const updated = [...existing, newEntry];
      await storage.setJSON(STORAGE_KEYS.OFFLINE_QUEUE, updated);
      setQueuedItems(updated);
    },
    []
  );

  const syncOfflineQueue = useCallback(async () => {
    const queue = (await storage.getJSON<QueuedActivity[]>(STORAGE_KEYS.OFFLINE_QUEUE)) || [];
    if (queue.length === 0 || isSyncing) return;

    setIsSyncing(true);
    const remaining: QueuedActivity[] = [];

    for (const item of queue) {
      try {
        await completeActivityApi(item.activityId, item.score, item.timeSpentSeconds);
      } catch (err: any) {
        // If server is unreachable or error occurs, retain in queue for next sync
        remaining.push(item);
      }
    }

    await storage.setJSON(STORAGE_KEYS.OFFLINE_QUEUE, remaining);
    setQueuedItems(remaining);
    setIsSyncing(false);
  }, [isSyncing]);

  return {
    queuedCount: queuedItems.length,
    isSyncing,
    queueActivityCompletion,
    syncOfflineQueue,
  };
}

export default useOfflineSync;
