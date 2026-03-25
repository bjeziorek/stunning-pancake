import { useCallback, useState } from "react";

export function useColumns(propCols) {
    const [columns, setColumns] = useState(propCols);
    const [dragged, setDragged] = useState(null);

    const toggleColumn = useCallback((id: string) => {
        setColumns(cols =>
            cols.map(col =>
                col.id === id ? { ...col, visible: !col.visible } : col
            )
        );
    }, []);

    const handleDrop = useCallback((targetKey: string) => {
        if (!dragged) return;

        const newOrder = [...columns];
        const fromIndex = newOrder.findIndex(c => c.id === dragged);
        const toIndex = newOrder.findIndex(c => c.id === targetKey);

        const [moved] = newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, moved);

        setColumns(newOrder);
        setDragged(null);
    }, [columns, dragged]);

    return {
        toggleColumn,
        columns,
        setColumns,
        handleDrop,
        dragged,
        setDragged
    }
}