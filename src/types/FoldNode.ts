export interface FoldNode {
    id: string
    type: string
    props?: Record<string, any>
    style?: Record<string, any>
    responsive?: {
        [breakpoint: string]: {
            props?: Record<string, any>
            style?: Record<string, any>
        }
    }
    children?: FoldNode[]
}
