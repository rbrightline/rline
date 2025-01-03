import { LoginWithSSO } from '@rline/type';
import { Property, Data } from '@rline/property';

@Data()
export class LoginWithSSODto implements LoginWithSSO {
  @Property({ type: 'string', format: 'email', required: true })
  username: string = 'email@domain.com';

  @Property({ type: 'string', minLength: 6, maxLength: 8, required: true })
  sso: string = '1248719874190752';
}
