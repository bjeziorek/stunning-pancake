import { useCallback, useMemo, useState } from "react";
import type { TableData } from "../../types/data";
import type { TableColumnsColumn } from "../../types/columns";
import type { TableSortSort } from "../../types/sort";
import { sortColumn } from './utils/sortColumn'
import { toggleSortState } from './utils/toggleSortState'

export function useSort<Data>(data: TableData<Data>) {
    const [sort, setSort] = useState<TableSortSort<Data>>({
        column: null,
        direction: "asc",
    });

    const sortFn = useMemo(
        () => sortColumn<Data>(sort.column?.id ?? null, sort.direction),
        [sort.column?.id, sort.direction]
    );

    const sortedData = useMemo(() => [...data].sort(sortFn), [data, sortFn]);
    const toggleSort = useCallback((column: TableColumnsColumn<Data> | null) => {
        setSort(prev => toggleSortState(prev, column));
    }, []);

    return {
        sortedData,
        sort,
        setSort,
        toggleSort
    }
}