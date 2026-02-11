export interface FoldNode {
    id: string
    type: string
    props?: Record<string, any>
    style?: Record<string, string>
    children?: FoldNode[]
}
