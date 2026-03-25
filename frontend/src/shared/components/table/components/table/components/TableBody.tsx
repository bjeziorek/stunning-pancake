import type { Model } from "@/modules/models/types/Models"
import { Table } from "@radix-ui/themes"
import type { TableColumnsColumns } from "../../../types/columns";
import type { TableData } from "../../../types/data";

interface TableBodyProps {
    paginated: TableData,
    columns: TableColumnsColumns
}

export function TableBody(props: TableBodyProps) {
    const { paginated, columns } = props;

    return (
        <Table.Body>
            {paginated.map((model: Model) => (
                <Table.Row key={model.id}>
                    {columns.filter(c => c.visible).map(col => (
                        <Table.Cell key={col.id}>
                            {col.render(model)}
                        </Table.Cell>
                    ))}
                </Table.Row>
            ))}
        </Table.Body>
    )
}