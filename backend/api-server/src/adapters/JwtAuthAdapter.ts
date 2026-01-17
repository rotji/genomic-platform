import { IAuthAdapter } from './IAuthAdapter';

// Example JWT Auth Adapter implementation
export class JwtAuthAdapter implements IAuthAdapter {
  private jwtLib: any;
  private secret: string;

  constructor(jwtLib: any, secret: string) {
    this.jwtLib = jwtLib;
    this.secret = secret;
  }

  async authenticate(token: string): Promise<any> {
    try {
      return this.jwtLib.verify(token, this.secret);
    } catch (err) {
      return null;
    }
  }

  async getUserRoles(userId: string): Promise<string[]> {
    // Example: fetch roles from DB or static mapping
    return ['user'];
  }
}
