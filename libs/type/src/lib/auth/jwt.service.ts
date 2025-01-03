import { JWTPayload } from './jwt-payload';

export interface JwtService<TJWTPayload = JWTPayload> {
  sign(sessionId: number): Promise<string>;
  verify(token: string): Promise<TJWTPayload>;
}
