import type { NodeType } from '../types/nodes'
import type { RenderContext } from './RenderContext'

export abstract class BaseRenderer<T extends NodeType> {
    abstract render(node: T, ctx: RenderContext): HTMLElement | DocumentFragment
}
