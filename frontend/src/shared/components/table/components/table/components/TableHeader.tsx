import { Table } from "@radix-ui/themes"

interface TableHeaderProps {
    setDragged: any,
    handleDrop: any,
    columns: any,
    toggleSort: any,
    sort: any

}

export function TableHeader(props: TableHeaderProps) {
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