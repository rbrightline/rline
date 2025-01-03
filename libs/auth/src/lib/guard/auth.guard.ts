import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '@rline/type';
import {
  getOperationName,
  getResourceName,
  isResourcePublic,
} from '@rline/rest';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly authService: AuthService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (isResourcePublic(this.reflector, context)) return true;

    const resource = getResourceName(this.reflector, context);
    const operation = getOperationName(this.reflector, context);

    const token = this.extractToken(req);

    if (!token) return false;

    const { sub } = await this.authService.verify(token);

    const session = await this.authService.findSessionById(sub);

    if (!session) return false;

    if (resource && operation) {
      if (
        session &&
        session.permissions.includes(`${resource}::${operation}`)
      ) {
        return true;
      }
      return false;
    }

    return true;
  }

  extractToken(req: any): string {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    return token;
  }
}
