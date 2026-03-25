export type TableColumnsColumns<T> = {
    id: string,
    label: string,
    visible: boolean,
    render: (row: T) => React.ReactNode
    // consider adding here sorting function
}[];

export type TableColumnsToggleColumn = (id: string) => void;