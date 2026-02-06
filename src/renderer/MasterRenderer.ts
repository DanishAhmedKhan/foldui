import type { NodeType } from '../types/nodes'
import type { RenderContext } from './RenderContext'
import type { RendererRegistry } from './RendererRegistry'

export class MasterRenderer implements RenderContext {
    constructor(private registry: RendererRegistry) {}

    public renderNode(node: NodeType): HTMLElement | DocumentFragment {
        const renderer = this.registry.get(node.type)
        return renderer.render(node, {
            renderNode: this.renderNode.bind(this),
        })
    }

    public renderToDom(node: NodeType): HTMLElement | DocumentFragment {
        return this.renderNode(node)
    }

    public renderToString(node: NodeType): string {
        const el = this.renderNode(node)
        return el instanceof HTMLElement ? el.outerHTML : ''
    }
}
