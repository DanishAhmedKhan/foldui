import type { NodeType } from '../types/nodes'

export interface RenderContext {
    renderNode(node: NodeType): HTMLElement | DocumentFragment
}
