import { Injectable } from '@nestjs/common';
import {
  AuthService,
  Login,
  LoginResult,
  LoginService,
  LoginWithSSO,
  MessageResult,
} from '@rline/type';

@Injectable()
export class AuthLoginService implements LoginService {
  constructor(protected readonly authService: AuthService) {}

  async login(body: Login): Promise<LoginResult> {
    const found = await this.authService.findUserByUsername(body.username);
    const session = await this.authService.createSession(found.id);
    const token = await this.authService.sign(session.id);

    return { token };
  }
  
  loginWithSSO(body: LoginWithSSO): Promise<LoginResult> {
    throw new Error('Method not implemented.');
  }
  logout(sessionId: number): Promise<MessageResult> {
    throw new Error('Method not implemented.');
  }
  logoutAll(sessionId: number): Promise<MessageResult> {
    throw new Error('Method not implemented.');
  }
}
