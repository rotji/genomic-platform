import { LocalUserStorage } from './LocalUserStorage';
import type { IUserStorage } from './IUserStorage';

// Singleton instance for user storage
export const userStorage: IUserStorage = new LocalUserStorage();
