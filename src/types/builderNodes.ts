import type {
    BaseNode,
    ButtonNode,
    ContainerNode,
    CustomNode,
    FragmentNode,
    ImageNode,
    ListItemNode,
    ListNode,
    SectionNode,
    TextNode,
} from './nodes'

export interface BuilderBaseNode extends Omit<BaseNode, 'children' | 'id'> {
    id: string
    parent: string | null
    children: string[]
}

export type BuilderNode =
    | (FragmentNode & BuilderBaseNode)
    | (SectionNode & BuilderBaseNode)
    | (ContainerNode & BuilderBaseNode)
    | (TextNode & BuilderBaseNode)
    | (ImageNode & BuilderBaseNode)
    | (ButtonNode & BuilderBaseNode)
    | (ListNode & BuilderBaseNode)
    | (ListItemNode & BuilderBaseNode)
    | (CustomNode & BuilderBaseNode)

export interface BuilderDocument {
    rootId: string
    nodes: Record<string, BuilderNode>
}
