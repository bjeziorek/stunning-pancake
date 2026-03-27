import type { TableColumnsColumns } from "../../../types/columns";
import type { TableDragDragged } from "../../../types/drag";

export function reorderColumns<Data>(columns:TableColumnsColumns<Data>, fromId: TableDragDragged, toId:string) {
  const newOrder = [...columns];

  const fromIndex = newOrder.findIndex(c => c.id === fromId);
  const toIndex = newOrder.findIndex(c => c.id === toId);

  if (fromIndex === -1 || toIndex === -1) return newOrder;

  const [moved] = newOrder.splice(fromIndex, 1);
  newOrder.splice(toIndex, 0, moved);

  return newOrder;
}
