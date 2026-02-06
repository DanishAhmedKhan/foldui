import type { NodeType } from '../types/nodes'
import type { RendererRegistry } from './RendererRegistry'

export class MasterRenderer {
    constructor(private registry: RendererRegistry) {}

    public render(node: NodeType): HTMLElement | DocumentFragment {
        return this.renderNode(node)
    }

    private renderNode = (node: NodeType) => {
        const renderer = this.registry.get(node.type)
        return renderer.render(node as any, {
            renderNode: this.renderNode,
        })
    }
}
