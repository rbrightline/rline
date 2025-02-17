import { Equal, FindOperator, ILike } from 'typeorm';

export function pickStringOperator(
  operator: string,
  value: string
): FindOperator<string> | undefined {
  switch (operator) {
    case 'q':
      return ILike(`%${value}%`);
    case 'eq':
      return Equal(`${value}`);

    // [ ] add other operator
  }

  return;
}
