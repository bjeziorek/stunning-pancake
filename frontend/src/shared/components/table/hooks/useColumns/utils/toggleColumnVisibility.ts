import type { TableColumnsColumn } from "../../../types/columns"

export function toggleColumnVisibility<Data>(col: TableColumnsColumn<Data>, id: string) {
    return col.id === id ? { ...col, visible: !col.visible } : col
}