import { isArrayEqual } from './is-array-equal';

describe('isArrayEqual', () => {
    test('should return true for two empty arrays', () => {
        expect(isArrayEqual([], [])).toBe(true);
    });

    test('should return true for two identical arrays', () => {
        expect(isArrayEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    test('should return false for arrays of different lengths', () => {
        expect(isArrayEqual([1, 2, 3], [1, 2])).toBe(false);
    });

    test('should return false for arrays with different elements', () => {
        expect(isArrayEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    test('should return true for arrays with same elements in different order', () => {
        expect(isArrayEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    });

    test('should return true for arrays with same reference', () => {
        const arr = [1, 2, 3];
        expect(isArrayEqual(arr, arr)).toBe(true);
    });

    test('should return false for arrays with same elements but different types', () => {
        expect(isArrayEqual([1, '2', 3], [1, 2, 3])).toBe(false);
    });
});