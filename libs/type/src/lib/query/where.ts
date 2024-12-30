export type WhereOptions<T, O = any> = {
  [P in keyof T]?: O;
};
