/**
 * Storage Service Wrapper (AsyncStorage / Fallback)
 * Udaan — Rural Education Platform
 */

// Fallback in-memory / web localStorage wrapper
class MemoryStorage {
  private store: Map<string, string> = new Map();

  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      return this.store.get(key) || null;
    } catch {
      return this.store.get(key) || null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
      this.store.set(key, value);
    } catch {
      this.store.set(key, value);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
      this.store.delete(key);
    } catch {
      this.store.delete(key);
    }
  }

  async clear(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
      this.store.clear();
    } catch {
      this.store.clear();
    }
  }
}

const memoryStorage = new MemoryStorage();

export const storage = {
  async getItem(key: string): Promise<string | null> {
    return memoryStorage.getItem(key);
  },

  async setItem(key: string, value: string): Promise<void> {
    return memoryStorage.setItem(key, value);
  },

  async removeItem(key: string): Promise<void> {
    return memoryStorage.removeItem(key);
  },

  async clear(): Promise<void> {
    return memoryStorage.clear();
  },

  async getJSON<T>(key: string): Promise<T | null> {
    const data = await this.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  },

  async setJSON<T>(key: string, value: T): Promise<void> {
    await this.setItem(key, JSON.stringify(value));
  },
};

export default storage;
