import { MessageResult } from '../results/message';
import { Login, LoginResult, LoginWithSSO } from './login';

export interface LoginService {
  /**
   * Log the user in
   * @param body
   */
  login(body: Login): Promise<LoginResult>;

  /**
   * Log the user in with SSO
   * @param body
   */
  loginWithSSO(body: LoginWithSSO): Promise<LoginResult>;

  /**
   * Log the user out
   * @param sessionId
   */
  logout(sessionId: number): Promise<MessageResult>;

  /**
   * Log the user out of all devices
   * @param sessionId
   */
  logoutAll(sessionId: number): Promise<MessageResult>;
}
