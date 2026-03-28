import { Table } from "@radix-ui/themes";
import { TableBody } from "./components/TableBody";
import { TableHeader } from "./components/TableHeader";
import type { TableColumnsColumns } from "../../types/columns";
import type { TableData } from "../../types/data";
import type { TableSortSort, TableSortToggleSort } from "../../types/sort";
import type { TableDragHandleDrop, TableDragSetDragged } from "../../types/drag";

interface TableFullProps<Data extends { id: string | number; }> {
    columns: TableColumnsColumns<Data>,
    setDragged: TableDragSetDragged,
    handleDrop: TableDragHandleDrop,
    toggleSort: TableSortToggleSort<Data>,
    sort: TableSortSort<Data>,
    paginated: TableData<Data>
}

export function TableFull<Data extends { id: string | number; }>(props: TableFullProps<Data>) {
    const {
        columns,
        setDragged,
        handleDrop,
        toggleSort,
        sort,
        paginated
    } = props;

    return (
        <Table.Root>
            <TableHeader setDragged={setDragged} handleDrop={handleDrop} columns={columns} toggleSort={toggleSort} sort={sort}></TableHeader>
            <TableBody paginated={paginated} columns={columns}></TableBody>
        </Table.Root>
    )
}