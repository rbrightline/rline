/**
 *
 * @param controllerName SampleController
 */
export function parseResourceName(controllerName: string): {
  singular: string;
  plural: string;
} {
  if (!controllerName.endsWith('Controller'))
    throw new Error('Resouce controller should be end with Controller!');
  controllerName = controllerName.replace('Controller', '');
  let singular = controllerName
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
