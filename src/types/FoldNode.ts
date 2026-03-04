export interface FoldNode {
    id: string
    type: string
    children?: FoldNode[]
    [key: string]: any
}
