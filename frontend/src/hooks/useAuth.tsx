import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, SignUpData, SignInData } from '../types/auth';
import { userStorage } from '../services/userStorage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Check if user is already logged in on app start
  useEffect(() => {
    const storedUser = userStorage.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Basic validation
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // For now, just create a local user (replace with actual API call)
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: 'user', // Default role for new users
        createdAt: new Date()
      };

      setUser(newUser);
      userStorage.setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      setIsLoading(true);
      setError(null);

      // For now, just create a mock user (replace with actual API call)
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: 'User',
        role: data.email.includes('admin') ? 'admin' : 'user', // Simple role assignment
        createdAt: new Date()
      };

      setUser(mockUser);
      userStorage.setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    userStorage.removeUser();
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        signUp,
        signIn,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};