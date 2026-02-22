import { FoldUI } from './FoldUI'
import type { Component } from './Component'
import type { FoldNode } from '../types/FoldNode'

const defaultFoldUI = new FoldUI()

export const Fold = {
    addComponent(component: Component) {
        defaultFoldUI.addComponent(component)
    },

    render(schema: FoldNode, targetDocument: Document = document): HTMLElement | DocumentFragment {
        return defaultFoldUI.render(schema, targetDocument)
    },
}
