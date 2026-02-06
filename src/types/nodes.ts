export interface BaseNode {
    id?: string
    style?: Record<string, any>
    responsive?: Record<string, any>
    states?: Record<string, any>
    children?: NodeType[]
}

export interface FragmentNode extends BaseNode {
    type: 'fragment'
}

export interface SectionNode extends BaseNode {
    type: 'section'
}

export interface ContainerNode extends BaseNode {
    type: 'container'
    props?: {
        layout: FlexLayout | GridLayout
    }
}

export interface FlexLayout {
    type: 'flex'
    direction?: 'row' | 'column'
    align?: 'start' | 'center' | 'end' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'space-between'
    gap?: number
}

export interface GridLayout {
    type: 'grid'
    columns: number | string
    gap?: number
}

export interface TextNode extends BaseNode {
    type: 'text'
    props: {
        tag?: keyof HTMLElementTagNameMap
        content: string
    }
}

export interface ImageNode extends BaseNode {
    type: 'image'
    props: {
        src: string
        alt?: string
    }
}

export interface ListNode extends BaseNode {
    type: 'list'
    props?: {
        tag?: 'ul' | 'ol'
        variant?: 'vertical' | 'horizontal' | 'grid'
    }
}

export interface ListItemNode extends BaseNode {
    type: 'list-item'
    props?: {
        href?: string
    }
}

export interface CustomNode extends BaseNode {
    type: 'custom'
    props: {
        html: string
    }
}

export type NodeType =
    | FragmentNode
    | SectionNode
    | ContainerNode
    | TextNode
    | ImageNode
    | ListNode
    | ListItemNode
    | CustomNode
