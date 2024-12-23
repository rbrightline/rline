/**
 *
 * @param singularResourceName SampleController
 */
export function parseResourceName(singularResourceName: string): {
  singular: string;
  plural: string;
} {
  let singular = singularResourceName
    .split('')
    .map((e) => (/[A-Z]/.test(e) ? '-' + e : e))
    .map((e) => e.toLowerCase())
    .join('')
    .slice(1);

  let plural = singular.endsWith('s')
    ? singular + 'es'
    : singular.endsWith('y')
    ? singular.slice(0, singular.length - 1) + 'ies'
    : singular + 's';

  return {
    singular,
    plural,
  };
}
