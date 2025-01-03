import { SessionModel } from '../model/session';
import { UserModel } from '../model/user';
import { MessageResult } from '../results/message';
import { JWTPayload } from './jwt-payload';

/**
 * AuthService interface provides methods for handling authentication-related operations.
 */
export interface AuthService {
  /**
   * Signs a session and returns a JWT token.
   * @param sessionId - The ID of the session to sign.
   * @returns A promise that resolves to a JWT token as a string.
   */
  sign(sessionId: number): Promise<string>;

  /**
   * Verifies a JWT token and returns the payload.
   * @param token - The JWT token to verify.
   * @returns A promise that resolves to the JWT payload.
   */
  verify(token: string): Promise<JWTPayload>;

  /**
   * Generates a UUID.
   * @returns A UUID as a string.
   */
  uuid(): string;

  /**
   * Hashes a password.
   * @param password - The password to hash.
   * @returns A promise that resolves to the hashed password as a string.
   */
  hash(password: string): Promise<string>;

  /**
   * Compares a password with a hash.
   * @param password - The password to compare.
   * @param hash - The hash to compare the password with.
   * @returns A promise that resolves to a boolean indicating whether the password matches the hash.
   */
  compare(password: string, hash: string): Promise<boolean>;

  /**
   * Finds a user by their username.
   * @param username - The username to search for.
   * @returns A promise that resolves to the user model.
   */
  findUserByUsername(username: string): Promise<UserModel>;

  /**
   * Finds a user by their username and SSO.
   * @param username - The username to search for.
   * @param sso - The SSO to search for.
   * @returns A promise that resolves to the user model.
   */
  findUserByUsernameAndSSO(username: string, sso: string): Promise<UserModel>;

  /**
   * Finds user session by id.
   * @param sessionId
   */
  findSessionById(sessionId: number): Promise<SessionModel>;

  /**
   * Creates a session for a user.
   * @param userId - The ID of the user to create a session for.
   * @returns A promise that resolves to the session model.
   */
  createSession(userId: number): Promise<SessionModel>;

  /**
   * Deletes a session by its ID.
   * @param sessionId - The ID of the session to delete.
   * @returns A promise that resolves to a message result.
   */
  deleteSession(sessionId: number): Promise<MessageResult>;

  /**
   * Deletes all sessions for a given session ID.
   * @param sessionId - The ID of the session to delete all sessions for.
   * @returns A promise that resolves to a message result.
   */
  deleteAllSessions(sessionId: number): Promise<MessageResult>;
}
