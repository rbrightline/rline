import { OrderDir } from './OrderDir';

export type Order<T> = {
  [key in keyof T]?: OrderDir;
};
