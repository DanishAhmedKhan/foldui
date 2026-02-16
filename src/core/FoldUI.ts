import { Renderer } from './Renderer'
import { ComponentRegistry } from './ComponentRegistry'
import { StyleEngine } from './StyleEngine'
import type { FoldNode } from '../types/FoldNode'
import type { Component } from './Component'
import { defaultComponents } from '../component/defaultCompoennts'

export type FoldUISchema = unknown

export class FoldUI {
    private registry: ComponentRegistry
    private styleEngine: StyleEngine

    constructor(registry?: ComponentRegistry) {
        this.registry = registry ?? new ComponentRegistry()
        this.styleEngine = new StyleEngine(this.registry)

        for (const component of defaultComponents) {
            this.registry.register(component as Component)
        }
    }

    public addComponent(component: Component) {
        this.registry.register(component)
        return this
    }

    public render(schema: FoldNode): HTMLElement | DocumentFragment {
        const renderer = new Renderer(this.registry)
        const rootEl = renderer.render(schema)

        const css = this.styleEngine.generate(schema)
        console.log(css)

        if (css) {
            const styleTag = document.createElement('style')
            styleTag.textContent = css
            document.head.appendChild(styleTag)
        }

        return rootEl
    }
}
