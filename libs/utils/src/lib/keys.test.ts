import { keys } from './keys';

describe('keys', () => {
    it('should return the keys of an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const result = keys(obj);
        expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should return an empty array for an empty object', () => {
        const obj = {};
        const result = keys(obj);
        expect(result).toEqual([]);
    });

    it('should work with objects having different types of values', () => {
        const obj = { a: 1, b: 'string', c: true, d: null, e: undefined };
        const result = keys(obj);
        expect(result).toEqual(['a', 'b', 'c', 'd', 'e']);
    });

    it('should work with nested objects', () => {
        const obj = { a: { nested: 1 }, b: { nested: 2 } };
        const result = keys(obj);
        expect(result).toEqual(['a', 'b']);
    });

    it('should work with arrays', () => {
        const arr = [1, 2, 3];
        const result = keys(arr);
        expect(result).toEqual(['0', '1', '2']);
    });
});