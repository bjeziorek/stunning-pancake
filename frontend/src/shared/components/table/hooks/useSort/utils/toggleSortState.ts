import type { TableColumnsColumn } from "../../../types/columns";
import type { TableSortSort } from "../../../types/sort";

export function toggleSortState<Data>(
  prev: TableSortSort<Data>,
  column: TableColumnsColumn<Data> | null
): TableSortSort<Data> {
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
}
