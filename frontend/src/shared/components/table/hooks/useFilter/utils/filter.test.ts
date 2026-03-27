import { describe, it, expect } from "vitest";
import { filter as metchesSearch } from './filter';

interface Data {
    name: string,
}

describe('filter', () => {
    const data: Data[] = [
        { name: 'Anna' },
        { name: 'Annie' },
        { name: 'John' }
    ];

    it('inner function returns true for matching string', () => {
        expect(metchesSearch({ name: 'Anna' }, 'Anna')).toEqual(true);
    });

    it('inner function returns true for matching substring', () => {
        expect(metchesSearch({ name: 'Anna' }, 'ann')).toEqual(true);
    });

    it('inner function returns false no match', () => {
        expect(metchesSearch({ name: 'Anna' }, 'zzz')).toEqual(false);
    });

    it('inner function returns true for empty string', () => {
        expect(metchesSearch({ name: 'Anna' }, '')).toEqual(true);
    });

    it('inner function return true for case insensitive match', () => {
        expect(metchesSearch({ name: 'Anna' }, "ANN")).toEqual(true);
    });

    it('filter works with inner function', () => {
        const filterFn = (row:Data) => metchesSearch(row, 'an');
        expect(data.filter(filterFn)).toEqual([
            { name: 'Anna' },
            { name: 'Annie' }
        ])
    });

    it('filter return empty array when no match', () => {
        expect(data.filter(data => metchesSearch(data, 'zzz'))).toEqual([])
    });
});
