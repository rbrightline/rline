import { MessageResult } from '../results/message';
import { ForgotPassword, UpdatePassword } from './login';

export interface RecoveryService {
  /**
   * Update the user's password
   */
  updatePassword(body: UpdatePassword): Promise<MessageResult>;

  /**
   * Send a password recovery email to the user
   */
  forgotPassword(body: ForgotPassword): Promise<MessageResult>;
}
