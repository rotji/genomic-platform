// Interface for authentication operations
export interface IAuthAdapter {
  authenticate(token: string): Promise<any>;
  getUserRoles(userId: string): Promise<string[]>;
  // Add more methods as needed
}
