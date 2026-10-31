const STORAGE_PREFIX = 'piyush_aquatic_';
const SCHEMA_VERSION = 'v2';
const VERSION_KEY = `${STORAGE_PREFIX}schema_version`;

/**
 * Initializes and manages versioned localStorage.
 * If schema version doesn't match, cleans obsolete app keys and re-seeds.
 */
class VersionedStorage {
  constructor() {
    this.ensureVersion();
  }

  private ensureVersion(): void {
    try {
      const currentVersion = localStorage.getItem(VERSION_KEY);
      if (currentVersion !== SCHEMA_VERSION) {
        // Reset all keys belonging to this application
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(STORAGE_PREFIX)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
        localStorage.setItem(VERSION_KEY, SCHEMA_VERSION);
      }
    } catch (e) {
      console.warn('LocalStorage is not available or restricted:', e);
    }
  }

  public getItem<T>(key: string, defaultValue: T): T {
    try {
      const namespacedKey = `${STORAGE_PREFIX}${key}`;
      const item = localStorage.getItem(namespacedKey);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (e) {
      console.warn(`Error reading key "${key}" from localStorage:`, e);
      return defaultValue;
    }
  }

  public setItem<T>(key: string, value: T): void {
    try {
      const namespacedKey = `${STORAGE_PREFIX}${key}`;
      localStorage.setItem(namespacedKey, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing key "${key}" to localStorage:`, e);
    }
  }

  public removeItem(key: string): void {
    try {
      const namespacedKey = `${STORAGE_PREFIX}${key}`;
      localStorage.removeItem(namespacedKey);
    } catch (e) {
      console.warn(`Error removing key "${key}" from localStorage:`, e);
    }
  }

  public clearAllAppStorage(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
      localStorage.setItem(VERSION_KEY, SCHEMA_VERSION);
    } catch (e) {
      console.warn('Error clearing app storage:', e);
    }
  }
}

export const storage = new VersionedStorage();
