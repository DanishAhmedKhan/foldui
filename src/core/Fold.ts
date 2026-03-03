import { FoldUI } from './FoldUI'
import type { Component } from './Component'
import type { FoldNode } from '../types/FoldNode'
import type { RendererPlugin } from './RendererPlugin'

const defaultFoldUI = new FoldUI()

export const Fold = {
    addComponent(component: Component) {
        defaultFoldUI.addComponent(component)
    },

    use(plugin: RendererPlugin) {
        defaultFoldUI.use(plugin)
    },

    render(schema: FoldNode, targetDocument: Document = document): HTMLElement | DocumentFragment {
        return defaultFoldUI.render(schema, targetDocument)
    },
}
