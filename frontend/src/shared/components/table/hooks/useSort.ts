import { useCallback, useMemo, useState } from "react";
import type { TableData } from "../types/data";
import type { TableColumnsColumns } from "../types/columns";
import type { TableSortSort } from "../types/sort";

export function useSort<Data>(data:TableData<Data>) {
    const [sort, setSort] = useState<TableSortSort<Data>>({
        column: null,
        direction: "asc",
    });

    const sortFn = useCallback((a, b) => {
        if (!sort.column) return 0;

        const col = sort.column;
        const dir = sort.direction === "asc" ? 1 : -1;

        const valA = a[col];
        const valB = b[col];

        if (typeof valA === "number" && typeof valB === "number") {
            return (valA - valB) * dir;
        }

        return String(valA).localeCompare(String(valB)) * dir;
    }, [sort.column, sort.direction]);

    const sortedData = useMemo(() => [...data].sort(sortFn), [data, sortFn]);

    const toggleSort = useCallback((column:TableColumnsColumns<Data>) => {
        setSort((prev) => {

            if (prev.column === column) {
                return {
                    column,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }

            return {
                column,
                direction: "asc",
            };
        })
    }, []);

    return {
        sortedData,
        sort,
        setSort,
        toggleSort
    }
}