import type { TableColumnsColumn } from "@/shared/components/table/types/columns";
import type { TableSortDirection, TableSortSort } from "@/shared/components/table/types/sort";
import { describe, it, expect } from "vitest"
import { toggleSortState } from "../../utils/toggleSortState";
import { sortColumn } from "../../utils/sortColumn";

describe('integration of toggle and sort', () => {
    interface Data {
        id: string,
        size: number
    }

    const data: Data[] = [
        { id: 'aaa', size: 6 },
        { id: 'bbb', size: 9 },
        { id: 'ccc', size: 6 },
    ]

    const colA: TableColumnsColumn<Data> = {
        id: 'id',
        label: 'sdsd',
        visible: true,
        render: ()=>null
    };
    const colB: TableColumnsColumn<Data> = {
        id: 'size',
        label: 'dssdsd',
        visible: false,
        render: () => null
    };

    const toggleState: TableSortDirection = "asc";

    it('when toggle is changed, sorting changes direction', () => {
        const prev: TableSortSort<Data> = { column: colA, direction: toggleState }
        const result = toggleSortState<Data>(prev, colA);
        const sortFn = sortColumn(result.column?.id ?? null, result.direction)
        expect([...data].sort(sortFn)).toEqual([
            { id: 'ccc', size: 6 },
            { id: 'bbb', size: 9 },
            { id: 'aaa', size: 6 },
        ])
    });

    it('when column and toggle is changed, sorting changes direction', () => {
        const prev: TableSortSort<Data> = { column: colB, direction: toggleState }
        const result = toggleSortState<Data>(prev, colB);
        const sortFn = sortColumn(result.column?.id ?? null, result.direction)
        expect([...data].sort(sortFn)).toEqual([
            { id: 'bbb', size: 9 },
            { id: 'aaa', size: 6 },
            { id: 'ccc', size: 6 },
        ])
    })
})