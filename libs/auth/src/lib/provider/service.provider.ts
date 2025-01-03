import { AuthLoginService } from 'libs/type/dist';

export const LOGIN_SERVICE_TOKEN = 'LOGIN_SERVICE_TOKEN';

export function provideLoginService() {
  return {
    provide: AuthLoginService,
    useClass: AuthLoginService,
  };
}
