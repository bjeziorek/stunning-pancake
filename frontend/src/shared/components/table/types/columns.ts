export type TableColumnsColumn<T> = {
    id: keyof T,
    label: string,
    visible: boolean,
    render: (row: T) => React.ReactNode
    // consider adding here sorting function
};

export type TableColumnsColumns<T> = TableColumnsColumn<T>[];

export type TableColumnsToggleColumn = (id: string) => void;