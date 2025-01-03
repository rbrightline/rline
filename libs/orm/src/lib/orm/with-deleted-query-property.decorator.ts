import { BooleanQueryProperty } from './boolean-query-property.decorator';

export function WithDeleteQueryProperty(): PropertyDecorator {
  return (t, p) => {
    BooleanQueryProperty({
      description: `Include the deleted entities in the query result.`,
    })(t, p);
  };
}
