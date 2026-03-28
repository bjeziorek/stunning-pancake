export type TableColumnsColumn<Data> = {
    id: Extract<keyof Data, string>; // need Extract because keyof Data caused necessity to use toString() in key in JSX because was union literal not string
    label: string,
    visible: boolean,
    render: (row: Data) => React.ReactNode
    // consider adding here sorting function
};

export type TableColumnsColumns<T> = TableColumnsColumn<T>[];

export type TableColumnsToggleColumn = (id: string) => void;