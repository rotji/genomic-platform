// Interface for user storage abstraction (localStorage, sessionStorage, cookies, etc.)
import type { User } from '../types/auth';

export interface IUserStorage {
  getUser(): User | null;
  setUser(user: User): void;
  removeUser(): void;
}
