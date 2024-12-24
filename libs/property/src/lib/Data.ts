import { Exclude } from 'class-transformer';

export function Data(): ClassDecorator {
  return (t) => {
    Exclude()(t);
  };
}
