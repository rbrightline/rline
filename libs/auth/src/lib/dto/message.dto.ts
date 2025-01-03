import { MessageResult } from '@rline/type';
import { Data, Property } from 'libs/property/dist';

@Data()
export class MessageResultDto implements MessageResult {
  @Property({ type: 'string' })
  message: string = 'response message';
}
