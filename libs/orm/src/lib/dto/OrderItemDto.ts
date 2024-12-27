import { Type } from '@nestjs/common';
import { Data, Property } from '@rline/property';
import { OrderItem, OrderDirection } from '@rline/query';
import { str } from '@rline/type';

@Data()
export class OrderItemDto implements OrderItem {
  @Property({ type: 'string', required: true, minLength: 1, maxLength: 30 })
  property = str();
  @Property({
    type: 'string',
    enum: ['ASC', 'DESC', 'asc', 'desc', '-1', '1'],
  })
  direction = str<OrderDirection>();
}

export function CreateOrderItemDto(entity: Type): Type {
  @Data()
  class __OrderItemDto extends OrderItemDto {
    @Property({ type: 'string', required: true, enum: Object.keys(entity) })
    override property = str();
  }

  return __OrderItemDto;
}
