import { MessageResult } from '../results/message';
import { AuthService } from './auth.service';
import { Login, LoginResult, LoginWithSSO } from './login';
import { LoginService } from './login.service';

export abstract class AuthLoginService implements LoginService {
  constructor(protected readonly authService: AuthService) {}

  async login(body: Login): Promise<LoginResult> {
    const { username, password } = body;
    const found = await this.authService.findUserByUsername(username);
    await this.authService.compare(password, found.password);
    const { id: sessionId } = await this.authService.createSession(found.id);
    const token = await this.authService.sign(sessionId);
    return { token };
  }

  async loginWithSSO(body: LoginWithSSO): Promise<LoginResult> {
    const { username, sso } = body;
    const found = await this.authService.findUserByUsernameAndSSO(
      username,
      sso
    );

    const { id: sessionId } = await this.authService.createSession(found.id);
    const token = await this.authService.sign(sessionId);
    return { token };
  }

  logout(sessionId: number): Promise<MessageResult> {
    return this.authService.deleteSession(sessionId);
  }

  logoutAll(sessionId: number): Promise<MessageResult> {
    return this.authService.deleteAllSessions(sessionId);
  }
}
