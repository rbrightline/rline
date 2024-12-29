import { parseOrderString } from './parse-order-string';

describe('parseOrderString', () => {
    it('should return null for an invalid order string', () => {
        const result = parseOrderString('invalidOrderString');
        expect(result).toBeNull();
    });

    it('should return null for an invalid property', () => {
        const isValidProperty = (property: string) => property === 'validProperty';
        const result = parseOrderString('invalidProperty::ASC', isValidProperty);
        expect(result).toBeNull();
    });

    it('should parse a valid order string with ASC direction', () => {
        const result = parseOrderString('property::ASC');
        expect(result).toEqual({ property: 'ASC' });
    });

    it('should parse a valid order string with DESC direction', () => {
        const result = parseOrderString('property::DESC');
        expect(result).toEqual({ property: 'DESC' });
    });

    it('should parse a valid order string with a valid property', () => {
        const isValidProperty = (property: string) => property === 'validProperty';
        const result = parseOrderString('validProperty::ASC', isValidProperty);
        expect(result).toEqual({ validProperty: 'ASC' });
    });

    it('should return null if direction is not ASC or DESC', () => {
        const result = parseOrderString('property::INVALID');
        expect(result).toBeNull();
    });
});