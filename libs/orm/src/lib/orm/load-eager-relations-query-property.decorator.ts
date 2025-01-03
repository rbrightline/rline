import { BooleanQueryProperty } from './boolean-query-property.decorator';

export function LoadEagerRelationQueryProperty(): PropertyDecorator {
  return (t, p) => {
    BooleanQueryProperty({
      description: `Whether to load the eager relations or not`,
    })(t, p);
  };
}
