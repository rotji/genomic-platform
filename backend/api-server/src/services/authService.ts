import { IAuthAdapter } from '../adapters/IAuthAdapter';

export class AuthService {
  private adapter: IAuthAdapter;

  constructor(adapter: IAuthAdapter) {
    this.adapter = adapter;
  }

  async authenticate(token: string) {
    return this.adapter.authenticate(token);
  }

  async getUserRoles(userId: string) {
    return this.adapter.getUserRoles(userId);
  }

  // Add more methods as needed, delegating to the adapter
}
