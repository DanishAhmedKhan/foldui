import type { NodeType } from '../types/nodes'
import type { RenderContext } from './RenderContext'

export abstract class BaseRenderer<T extends NodeType> {
    public render(node: T, ctx: RenderContext): HTMLElement | DocumentFragment {
        const el = this.createElement(node)

        if (el instanceof HTMLElement) {
            if (node.id) {
                el.dataset.folduiId = node.id
            }
        }

        if (node.children?.length) {
            for (const child of node.children) {
                el.appendChild(ctx.renderNode(child))
            }
        }

        return el
    }

    protected abstract createElement(node: T): HTMLElement | DocumentFragment
}
