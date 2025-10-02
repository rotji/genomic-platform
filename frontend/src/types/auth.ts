// Simple auth types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'researcher';
  createdAt: Date;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInData {
  email: string;
  password: string;
}