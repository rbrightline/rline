import { isPropertyName } from './is-property-name';

describe('isPropertyName', () => {
    it('should return true for valid property names', () => {
        expect(isPropertyName('validName')).toBe(true);
        expect(isPropertyName('another_valid_name')).toBe(true);
        expect(isPropertyName('name123')).toBe(true);
        expect(isPropertyName('_private')).toBe(true);
        expect(isPropertyName('$dollar')).toBe(true);
    });

    it('should return false for invalid property names', () => {
        expect(isPropertyName('')).toBe(false);
        expect(isPropertyName('123invalid')).toBe(false);
        expect(isPropertyName('invalid-name')).toBe(false);
        expect(isPropertyName('invalid name')).toBe(false);
        expect(isPropertyName('invalid.name')).toBe(false);
        expect(isPropertyName('invalid@name')).toBe(false);
    });
});