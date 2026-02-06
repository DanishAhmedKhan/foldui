import { BaseRenderer } from './BaseRenderer'
import type { FragmentNode } from '../types/nodes'
import type { RenderContext } from './RenderContext'

export class FragmentRenderer extends BaseRenderer<FragmentNode> {
    public render(node: FragmentNode, ctx: RenderContext) {
        const frag = document.createDocumentFragment()
        node.children?.forEach((child) => {
            frag.appendChild(ctx.renderNode(child))
        })
        return frag
    }
}
