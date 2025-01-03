import { LoginResult, Signup } from './login';

export interface SignupService {
  signup(body: Signup): Promise<LoginResult>;
}
