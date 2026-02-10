import type { Component } from './Component'

export class ComponentRegistry {
    private components = new Map<string, Component>()

    public register(component: Component) {
        if (this.components.has(component.name)) {
            throw new Error(`Component "${component.name}" already registered`)
        }
        this.components.set(component.name, component)
    }

    public get(name: string): Component | undefined {
        return this.components.get(name)
    }
}
