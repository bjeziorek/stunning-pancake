import type { TableColumnsColumns } from "./columns";

export type TableSortSort<Data> = {
    column: TableColumnsColumns<Data> | null,
    direction: "asc" | "desc",
};
export type TableSortToggleSort = () => void;
