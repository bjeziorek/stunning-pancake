import { describe, it, expect } from "vitest";
import { sortColumn } from "../../useSort/utils/sortColumn";
import { paginate } from "../../usePagination/utils/paginate";

describe('sort and pagination integration tests', () => {
    it('pagination cuts sorted subarray', () => {
        const data = [
            { age: 30, name: 'Anna' },
            { age: 20, name: 'John' },
            { age: 33, name: 'Eva' },
            { age: 25, name: 'Matt' },
            { age: 56, name: 'Sara' },
            { age: 26, name: 'Jack' },
            { age: 13, name: 'Evelyn' },
            { age: 15, name: 'Susan' },
        ];
        const sortFn = sortColumn('age', 'desc'); 
        const sorted = [...data].sort(sortFn)
        expect(paginate(sorted, 1, 5)).toEqual([
            { age: 56, name: 'Sara' },
            { age: 33, name: 'Eva' },
            { age: 30, name: 'Anna' },
            { age: 26, name: 'Jack' },
            { age: 25, name: 'Matt' },
        ]);

    })

})