import { BooleanQueryProperty } from './boolean-query-property.decorator';

export function LoadRelationIdsProperty(): PropertyDecorator {
  return (t, p) => {
    BooleanQueryProperty({
      description: `Whether to load the relation ids or not`,
    })(t, p);
  };
}
