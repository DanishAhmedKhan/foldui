import type {
    ButtonNode,
    ContainerNode,
    CustomNode,
    FragmentNode,
    ImageNode,
    ListItemNode,
    ListNode,
    NodeType,
    SectionNode,
    TextNode,
} from '../types/nodes'
import type { BaseRenderer } from './BaseRenderer'

type NodeTypeMap = {
    fragment: FragmentNode
    section: SectionNode
    container: ContainerNode
    text: TextNode
    image: ImageNode
    button: ButtonNode
    list: ListNode
    'list-item': ListItemNode
    custom: CustomNode
}

export class RendererRegistry {
    private renderers = new Map<keyof NodeTypeMap, BaseRenderer<any>>()

    public register<K extends keyof NodeTypeMap>(type: K, renderer: BaseRenderer<NodeTypeMap[K]>) {
        this.renderers.set(type, renderer)
    }

    public get(type: NodeType['type']): BaseRenderer<any> {
        const renderer = this.renderers.get(type as keyof NodeTypeMap)
        if (!renderer) {
            throw new Error(`No renderer registered for type: ${type}`)
        }
        return renderer
    }
}
