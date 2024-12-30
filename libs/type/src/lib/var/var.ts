export type Nonable<T> = T | undefined;

export type Nullable<T> = T | null;

export const DEFAULT_STRING = '';
export const DEFAULT_NUMBER = NaN;
export const DEFAULT_BOOLEAN = false;
export const DEFAULT_OBJECT = {};
export const DEFAULT_ARRAY = [];
export const DEFAULT_DATE = new Date(0);

export function value<T>(defaultValue?: Nonable<T>): Nullable<T> {
  return defaultValue ?? null;
}

export function str(defaultValue?: string): Nullable<string> {
  return typeof defaultValue == 'string' ? defaultValue : DEFAULT_STRING;
}

export function num(defaultValue?: Nonable<number>): Nullable<number> {
  return typeof defaultValue == 'number' ? defaultValue : DEFAULT_NUMBER;
}

export function bool(defaultValue?: Nonable<boolean>): Nullable<boolean> {
  return typeof defaultValue == 'boolean' ? defaultValue : DEFAULT_BOOLEAN;
}

export function date(defaultValue?: Nonable<Date>): Nullable<Date> {
  return defaultValue instanceof Date ? defaultValue : DEFAULT_DATE;
}

export function arr<T>(defaultValue?: Nullable<T[]>): Nullable<T[]> {
  return Array.isArray(defaultValue) ? defaultValue : DEFAULT_ARRAY;
}

export function obj<T>(defaultValue?: Nullable<T>): Nullable<T> {
  return !Array.isArray(defaultValue) &&
    typeof defaultValue == 'object' &&
    defaultValue != undefined
    ? defaultValue
    : (DEFAULT_OBJECT as Nullable<T>);
}

export function nvalue<T>(defaultValue?: Nonable<T>): Nonable<T> {
  return defaultValue ?? undefined;
}

export function nstr<T>(
  defaultValue?: Nonable<T & string>
): Nonable<T & string> {
  return typeof defaultValue == 'string' ? defaultValue : undefined;
}

export function nnum(defaultValue?: Nonable<number>): Nonable<number> {
  return typeof defaultValue == 'number' ? defaultValue : undefined;
}

export function nbool(defaultValue?: Nonable<boolean>): Nonable<boolean> {
  return typeof defaultValue == 'boolean' ? defaultValue : undefined;
}

export function ndate(defaultValue?: Nonable<Date>): Nonable<Date> {
  return defaultValue instanceof Date ? defaultValue : undefined;
}

export function narr<T>(defaultValue?: Nonable<T[]>): Nonable<T[]> {
  return Array.isArray(defaultValue) ? defaultValue : undefined;
}

export function nobj<T>(defaultValue?: Nonable<T>): Nonable<T> {
  return typeof defaultValue == 'object' &&
    !Array.isArray(defaultValue) &&
    defaultValue !== null
    ? defaultValue
    : undefined;
}
