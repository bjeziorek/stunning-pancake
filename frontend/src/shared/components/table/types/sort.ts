import type { TableColumnsColumn } from "./columns";

export type TableSortSort<Data> = {
    column: TableColumnsColumn<Data> | null,
    direction: "asc" | "desc",
};
export type TableSortToggleSort = () => void;
