import { Table } from "@radix-ui/themes"
import type { TableColumnsColumns } from "../../../types/columns";
import type { TableData } from "../../../types/data";

interface TableBodyProps<Data extends { id: string | number; }> {
    paginated: TableData<Data>,
    columns: TableColumnsColumns<Data>
}

export function TableBody<Data extends { id: string | number; }>(props: TableBodyProps<Data>) {
    const { paginated, columns } = props;

    return (
        <Table.Body>
            {paginated.map((model: Data) => (
                <Table.Row key={model.id}>
                    {columns.filter(c => c.visible).map(col => (
                        <Table.Cell key={col?.id}>
                            {col.render(model)}
                        </Table.Cell>
                    ))}
                </Table.Row>
            ))}
        </Table.Body>
    )
}