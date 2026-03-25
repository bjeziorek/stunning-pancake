import { Table } from "@radix-ui/themes";
import { TableBody } from "./components/TableBody";
import { TableHeader } from "./components/TableHeader";

interface TableFullProps {
    columns: any,
    setDragged: any,
    handleDrop: any,
    toggleSort: any,
    sort: any,
    paginated: any
}

export function TableFull(props: TableFullProps) {
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