import type { FoldNode } from '../types/FoldNode'
import type { StyleEngine } from './StyleEngine'

export interface RendererPlugin {
    name: string

    beforeRender?(context: { node: FoldNode; props: Record<string, any>; styleEngine: StyleEngine }): void

    afterRender?(context: { node: FoldNode; element: HTMLElement | DocumentFragment }): void
}
