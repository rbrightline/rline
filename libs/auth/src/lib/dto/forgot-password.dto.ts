import { Data, Property } from 'libs/property/dist';
import { ForgotPassword } from 'libs/type/dist';

@Data()
export class ForgotPasswordDto implements ForgotPassword {
  @Property({ type: 'string', format: 'email', required: true })
  username: string = 'email@domain.com';
}
