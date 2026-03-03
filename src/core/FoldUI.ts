import { Renderer } from './Renderer'
import { ComponentRegistry } from './ComponentRegistry'
import { StyleEngine } from './StyleEngine'
import type { FoldNode } from '../types/FoldNode'
import type { Component } from './Component'
import { defaultComponents } from '../component/defaultCompoennts'
import type { RendererPlugin } from './RendererPlugin'

export type FoldUISchema = unknown

export class FoldUI {
    private registry: ComponentRegistry
    private styleEngine: StyleEngine
    private plugins: RendererPlugin[] = []

    constructor(registry?: ComponentRegistry) {
        this.registry = registry ?? new ComponentRegistry()
        this.styleEngine = new StyleEngine()

        for (const component of defaultComponents) {
            this.registry.register(component as Component)
        }
    }

    public addComponent(component: Component) {
        this.registry.register(component)
        return this
    }

    public use(plugin: RendererPlugin) {
        this.plugins.push(plugin)
        return this
    }

    public render(schema: FoldNode, targetDocument: Document = document): HTMLElement | DocumentFragment {
        const renderer = new Renderer(this.registry, this.styleEngine)

        for (const plugin of this.plugins) {
            renderer.use(plugin)
        }

        const rootEl = renderer.render(schema)

        const css = this.styleEngine.toString()
        console.log(css)

        if (css) {
            const FOLD_STYLE_ID = '__fold_style__'

            let styleTag = targetDocument.getElementById(FOLD_STYLE_ID)
            if (!styleTag) {
                styleTag = targetDocument.createElement('style')
                styleTag.id = FOLD_STYLE_ID
            }

            styleTag.textContent = css
            targetDocument.head.appendChild(styleTag)
        }

        return rootEl
    }
}
