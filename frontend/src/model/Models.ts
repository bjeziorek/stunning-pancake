export type Status = "ready" | "loading" | "not_downloaded";

type Renderer<T> = (row: T) => React.ReactNode;

export interface Model {
    name: string,
    description: string,
    baseModel: string,
    version: string,
    loraCount: number,
    status:Status,
    id: string,// number | string,
    type: string,
    tags: string[],
    size: number | string,
    details: string
}



export interface Columns<T> {
    id: string,
    label: string,
    visible: boolean,
    render: Renderer<T>
}