import { Transform } from 'class-transformer';

export function DefaultValueTransform(defautlValue: any): PropertyDecorator {
  return (t, p) => {
    if (defautlValue != undefined) {
      Transform(({ value }) => {
        if (value == undefined) return defautlValue;
        return value;
      })(t, p);
    }
  };
}
