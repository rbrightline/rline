export type Nonable<T> = T | null | undefined;

export type Nullable<T> = T | null;

export function value<T>(defaultValue?: Nonable<T>): Nullable<T> {
  return defaultValue ?? null;
}

export function str(defaultValue?: Nonable<string>): Nullable<string> {
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
