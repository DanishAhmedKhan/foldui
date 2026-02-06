import type { NodeType } from '../types/nodes'
import type { RenderContext } from './RenderContext'
import type { RendererRegistry } from './RendererRegistry'

export class MasterRenderer implements RenderContext {
    constructor(private registry: RendererRegistry) {}

    public renderNode(node: NodeType): HTMLElement | DocumentFragment {
        const renderer = this.registry.get(node.type)
        return renderer.render(node as any, this)
    }

    public renderToString(schema: NodeType): string {
        const output = this.renderNode(schema)

        if (output instanceof DocumentFragment) {
            const wrapper = document.createElement('div')
            wrapper.appendChild(output)
            return wrapper.innerHTML
        }

        return output.outerHTML
    }

    public renderToDom(schema: NodeType): HTMLElement | DocumentFragment {
        return this.renderNode(schema)
    }
}
