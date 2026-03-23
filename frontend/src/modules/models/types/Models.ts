export type Status = "ready" | "loading" | "not_downloaded";

export interface Model {
    name: string,
    description: string,
    baseModel: string,
    version: string,
    loraCount: number,
    status:Status,
    id: string,
    type: string,
    tags: string[],
    size: number | string,
    details: string
}

type Renderer<T> = (row: T) => React.ReactNode;

export interface Columns<T> {
    id: string,
    label: string,
    visible: boolean,
    render: Renderer<T>
}