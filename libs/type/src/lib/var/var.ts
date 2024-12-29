export type Nonable<T> = T | undefined;

export type Nullable<T> = T | null;

export function value<T>(defaultValue?: Nonable<T>): Nullable<T> {
  return defaultValue ?? null;
}

export function str<T>(
  defaultValue?: Nonable<T & string>
): Nullable<T & string> {
  return typeof defaultValue == 'string' ? defaultValue : null;
}

export function num(defaultValue?: Nonable<number>): Nullable<number> {
  return typeof defaultValue == 'number' ? defaultValue : null;
}

export function bool(defaultValue?: Nonable<boolean>): Nullable<boolean> {
  return typeof defaultValue == 'boolean' ? defaultValue : null;
}

export function date(defaultValue?: Nonable<Date>): Nullable<Date> {
  return defaultValue instanceof Date ? defaultValue : null;
}

export function arr<T>(defaultValue?: Nullable<T[]>): Nullable<T[]> {
  return Array.isArray(defaultValue) ? defaultValue : null;
}

export function obj<T>(defaultValue?: Nullable<T>): Nullable<T> {
  return typeof defaultValue == 'object' && !Array.isArray(defaultValue)
    ? defaultValue
    : null;
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
  return typeof defaultValue == 'object' && !Array.isArray(defaultValue)
    ? defaultValue
    : undefined;
}
