import { Login } from '@rline/type';
import { Property, Data } from '@rline/property';

@Data()
export class LoginDto implements Login {
  @Property({ type: 'string', format: 'email', required: true })
  username: string = 'email@domain.com';

  @Property({ type: 'string', format: 'password', required: true })
  password: string = '!Password123.';
}
