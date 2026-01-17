import type { User } from '../types/auth';
import type { IUserStorage } from './IUserStorage';

// Default implementation using localStorage
export class LocalUserStorage implements IUserStorage {
  private key = 'user';

  getUser(): User | null {
    const stored = localStorage.getItem(this.key);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      this.removeUser();
      return null;
    }
  }

  setUser(user: User): void {
    localStorage.setItem(this.key, JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem(this.key);
  }
}
