import { Data, Property } from '@rline/property';
import { str } from '@rline/type';

@Data()
export class MessageDto {
  @Property({ type: 'string' }) message = str();
}
