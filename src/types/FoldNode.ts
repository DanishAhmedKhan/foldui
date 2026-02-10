export interface FoldNode {
    id: string
    type: string
    props?: Record<string, any>
    children?: FoldNode[]
}
