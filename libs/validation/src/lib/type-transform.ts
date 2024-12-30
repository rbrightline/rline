import { Transform } from 'class-transformer';
import { CommonValidationOptions } from './common-options';

export function NumberTransform(
  options: Partial<CommonValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    if (options.format === 'string') {
      Transform(({ value }) => {
        if (typeof value === 'string') {
          if (options.type === 'integer') {
            return parseInt(value);
          }
          return parseFloat(value);
        }
        return value;
      })(t, p);
    }
  };
}

export function StringTransform(
  options: Partial<CommonValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    if (options.format === 'string') {
      Transform(({ value }) => {
        if (typeof value != 'string') {
          if (value != undefined) {
            return JSON.stringify(value);
          }
        }
        return value;
      })(t, p);
    }
  };
}
export function BooleanTransform(
  options: Partial<CommonValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    if (options.format === 'string') {
      Transform(({ value }) => {
        return value === 'true' ? true : value === 'false' ? false : value;
      })(t, p);
    }
  };
}

export function ArrayTransform(
  options: Partial<CommonValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    if (options.format === 'string') {
      Transform(({ value }) => {
        if (typeof value === 'string') {
          try {
            return JSON.parse(value);
          } catch (err) {
            return value;
          }
        }
        return value;
      })(t, p);
    }
  };
}

export function ObjectTransform(
  options: Partial<CommonValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    if (options.format === 'string') {
      Transform(({ value }) => {
        if (typeof value === 'string') {
          try {
            return JSON.parse(value);
          } catch (err) {
            return value;
          }
        }
        return value;
      })(t, p);
    }
  };
}

export function TypeTransform(
  options: Partial<CommonValidationOptions>
): PropertyDecorator {
  return (t, p) => {
    const type = options.type;
    if (type == 'array') {
      ArrayTransform(options)(t, p);
    } else if (type == 'boolean') {
      BooleanTransform(options)(t, p);
    } else if (type == 'integer') {
      NumberTransform(options)(t, p);
    } else if (type == 'number') {
      NumberTransform(options)(t, p);
    } else if (type == 'object') {
      ObjectTransform(options)(t, p);
    } else if (type == 'string') {
      StringTransform(options)(t, p);
    }
  };
}
