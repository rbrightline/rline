import { isOrderString } from './is-order-string';

describe('isOrderString', () => {
    it('should return true for valid order strings', () => {
        expect(isOrderString('name::ASC')).toBe(true);
        expect(isOrderString('age::desc')).toBe(true);
        expect(isOrderString('username::DESC')).toBe(true);
        expect(isOrderString('email::asc')).toBe(true);
    });

    it('should return false for invalid order strings', () => {
        expect(isOrderString('name::ascending')).toBe(false);
        expect(isOrderString('123::ASC')).toBe(false);
        expect(isOrderString('name::')).toBe(false);
        expect(isOrderString('::ASC')).toBe(false);
        expect(isOrderString('nameASC')).toBe(false);
        expect(isOrderString('name::ascend')).toBe(false);
        expect(isOrderString('')).toBe(false);
    });

    it('should return false for order strings with more than 30 characters', () => {
        expect(isOrderString('averylongorderstringthatexceedsthirtychars::ASC')).toBe(false);
    });
});