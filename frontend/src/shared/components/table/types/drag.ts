export type TableDragDragged = string;
export type TableDragSetDragged = React.Dispatch<React.SetStateAction<TableDragDragged>>;

export type TableDragHandleDrop = (targetKey: string)=> void;
