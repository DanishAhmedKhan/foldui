import type { Component } from './Component'

export class ComponentRegistry {
    private components = new Map<string, Component<any>>()

    public register(component: Component<any>) {
        if (this.components.has(component.name)) {
            throw new Error(`Component "${component.name}" already registered`)
        }

        this.components.set(component.name, component)
    }

    public get(name: string): Component<any> | undefined {
        return this.components.get(name)
    }
}
