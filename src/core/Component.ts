import type { FoldNode } from '../types/FoldNode'

export interface Component {
    name: string

    render(ctx: { node: FoldNode; helper: any }): HTMLElement | DocumentFragment
}
