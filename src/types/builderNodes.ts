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

type Builderize<T> = Omit<T, 'children' | 'id'>

export interface BuilderBaseNode extends Omit<BaseNode, 'children' | 'id'> {
    id: string
    parent: string | null
    children: string[]
}

export type BuilderNode =
    | (Builderize<FragmentNode> & BuilderBaseNode)
    | (Builderize<SectionNode> & BuilderBaseNode)
    | (Builderize<ContainerNode> & BuilderBaseNode)
    | (Builderize<TextNode> & BuilderBaseNode)
    | (Builderize<ImageNode> & BuilderBaseNode)
    | (Builderize<ButtonNode> & BuilderBaseNode)
    | (Builderize<ListNode> & BuilderBaseNode)
    | (Builderize<ListItemNode> & BuilderBaseNode)
    | (Builderize<CustomNode> & BuilderBaseNode)

export interface BuilderDocumentSchema {
    rootId: string
    nodes: Record<string, BuilderNode>
}
