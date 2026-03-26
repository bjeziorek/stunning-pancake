import { useCallback, useState } from "react";
import { toggleColumnVisibility } from "./utils/toggleColumnVisibility";
import type { TableColumnsColumns } from "../../types/columns";
import { reorderColumns } from "./utils/reorderColumns";
import type { TableDragDragged } from "../../types/drag";

export function useColumns<Data>(propCols: TableColumnsColumns<Data>) {
    const [columns, setColumns] = useState<TableColumnsColumns<Data>>(propCols);
    const [dragged, setDragged] = useState<TableDragDragged>(null);

    const toggleColumn = useCallback((id: string) => {

        setColumns((cols: TableColumnsColumns<Data>) =>
            cols.map(col => toggleColumnVisibility<Data>(col, id)))
    }, []);

    const handleDrop = useCallback((targetKey: string) => {
        if (!dragged) return;

        setColumns((cols: TableColumnsColumns<Data>) => reorderColumns<Data>(cols, dragged, targetKey));
        setDragged(null);
    }, [dragged]);

    return {
        toggleColumn,
        columns,
        setColumns,
        handleDrop,
        dragged,
        setDragged
    }
}