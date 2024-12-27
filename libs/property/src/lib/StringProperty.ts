import { ApiPropertyOptions } from '@nestjs/swagger';
import {
  CommonValidationOptions,
  StringValidationOptions,
} from '@rline/validation';

export type StringPropertyOptions = StringValidationOptions &
  CommonValidationOptions;
export function StringProperty(
  options: StringPropertyOptions
): PropertyDecorator {
  return (t, p) => {};
}

class Sample {
  value = '';
}
