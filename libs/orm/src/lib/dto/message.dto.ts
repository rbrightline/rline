import { Data, Property } from '@rline/property';
import { MessageResult } from '@rline/type';

@Data()
export class MessageResultDto implements MessageResult {
  @Property({ type: 'string' }) message: string = 'Sample message';
}
