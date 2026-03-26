import { describe, it, expect } from 'vitest'
import { paginate } from './paginate'

const DATA = Array.from({ length: 12 }, (_, i) => i + 1);

describe('paginate', () => {
    it('returns first page', () => {
        expect(paginate(DATA, 1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('returns second page', () => {
        expect(paginate(DATA, 2, 5)).toEqual([6, 7, 8, 9, 10]);
    });

    it('returns last page with leftovers', () => {
        expect(paginate(DATA, 3, 5)).toEqual([11, 12]);
    });

    it('returns empty array when page is out of range', () => {
        expect(paginate(DATA, 5, 5)).toEqual([])
    });

    it('returns all items when pageSize is larger than data length', () => {
        expect(paginate(DATA, 1, 50)).toEqual(DATA);
    });

    it('returns single item when pageSize is 1', () => {
        expect(paginate(DATA, 3, 1)).toEqual([3]);
    });

    it('returns empty array for empty data', () => {
        expect(paginate([], 1, 5)).toEqual([]);
    });

    it('returns empty array when page is out of range', () => {
        expect(paginate(DATA, 10, 5)).toEqual([]);
    });

    it('returns empty array when pageSize is 0', () => {
        expect(paginate(DATA, 1, 0)).toEqual([]);
    });

    it('treats page = 0 as page 0 and returns empty array', () => {
        expect(paginate(DATA, 0, 5)).toEqual([]);
    });

    it('handles large datasets correctly', () => {
        const bigData = Array.from({ length: 1000 }, (_, i) => i + 1);

        const result = paginate(bigData, 10, 50);

        expect(result).toEqual(Array.from({ length: 50 }, (_, i) => 451 + i));
    });

});
