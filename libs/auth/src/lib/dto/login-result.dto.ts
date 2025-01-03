import { Data, Property } from 'libs/property/dist';
import { LoginResult } from 'libs/type/dist';

@Data()
export class LoginResultDto implements LoginResult {
  @Property({ type: 'string' }) token: string = 'jwtaccesstoken';
}
