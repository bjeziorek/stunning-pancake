import type { TableColumnsColumn } from "./columns";

export type TableSortDirection = "asc" | "desc";
export type TableSortSort<Data> = {
    column: TableColumnsColumn<Data> | null,
    direction: TableSortDirection,
};
export type TableSortToggleSort = () => void;
