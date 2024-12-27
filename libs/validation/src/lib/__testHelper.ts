import { validateSync } from 'class-validator';

export function validateTestInstance(instance: any): string[] | null {
  const errors = validateSync(instance);
  if (errors && errors.length > 0) {
    const result: string[] = [];

    errors.forEach((e) => {
      if (e.constraints)
        Object.keys(e.constraints).forEach((c) => result.push(c));

      if (e.children)
        validateTestInstance(errors)?.forEach((c) => result.push(c));
    });

    if (result.length > 0) {
      return result;
    }
  }
  return null;
}
