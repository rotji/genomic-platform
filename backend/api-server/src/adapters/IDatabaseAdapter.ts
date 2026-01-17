// Interface for database operations
export interface IDatabaseAdapter {
  findUserById(id: string): Promise<any>;
  saveUser(user: any): Promise<void>;
  // Add more methods as needed
}
