import { Table } from "@radix-ui/themes"
import type { TableColumnsColumns } from "../../../types/columns";
import type { TableSortSort, TableSortToggleSort } from "../../../types/sort";
import type { TableDragHandleDrop, TableDragSetDragged } from "../../../types/drag";

interface TableHeaderProps <Data>{
    setDragged: TableDragSetDragged,
    handleDrop: TableDragHandleDrop,
    columns: TableColumnsColumns<Data>,
    toggleSort: TableSortToggleSort,
    sort: TableSortSort<Data>
}

export function TableHeader<Data>(props: TableHeaderProps<Data>) {
    const { setDragged, handleDrop, columns, toggleSort, sort } = props;

    return (
        <Table.Header>
            <Table.Row>
                {columns.filter(c => c.visible).map(col => (
                    <Table.ColumnHeaderCell
                        key={col.id}
                        draggable
                        onDragStart={() => setDragged(col.id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(col.id)}
                        onClick={() => toggleSort(col.id)}
                    >
                        {col.label} {sort.column === col.id && (sort.direction === "asc" ? "▲" : "▼")}
                    </Table.ColumnHeaderCell>
                ))}
            </Table.Row>
        </Table.Header>
    )
}