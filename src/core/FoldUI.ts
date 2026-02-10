import { Renderer } from './Renderer'
import { ComponentRegistry } from './ComponentRegistry'
import type { FoldNode } from '../types/FoldNode'
import type { Component } from './Component'

export type FoldUISchema = unknown

export class FoldUI {
    private registry: ComponentRegistry

    constructor(registry?: ComponentRegistry) {
        this.registry = registry ?? new ComponentRegistry()
    }

    public addComponent(component: Component) {
        this.registry.register(component)
        return this
    }

    public render(schema: FoldNode): HTMLElement {
        const renderer = new Renderer(this.registry)
        return renderer.render(schema)
    }
}
