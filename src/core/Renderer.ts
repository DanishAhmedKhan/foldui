import type { FoldNode } from '../types/FoldNode'
import type { Component } from './Component'
import type { ComponentRegistry } from './ComponentRegistry'

export class Renderer {
    constructor(private registry: ComponentRegistry) {}

    public render(node: FoldNode): HTMLElement {
        const component = this.registry.get(node.type)
        if (!component) {
            throw new Error(`Unknown component "${node.type}"`)
        }

        const props = this.resolveProps(component, node.props)

        const el = component.render({
            id: node.id,
            props,
        })

        el.classList.add(`fui-${node.type}`)
        el.setAttribute('data-fui-id', node.id)
        el.setAttribute('data-fui-type', node.type)

        if (node.children?.length) {
            for (const childNode of node.children) {
                const childEl = this.render(childNode)
                el.appendChild(childEl)
            }
        }

        return el
    }

    private resolveProps(component: Component, incomingProps?: Record<string, any>) {
        const resolved: Record<string, any> = {}

        if (!component.props) return incomingProps ?? {}

        for (const key in component.props) {
            const schema = component.props[key]

            if (incomingProps?.[key] !== undefined) {
                resolved[key] = incomingProps[key]
            } else if (schema.default !== undefined) {
                resolved[key] = schema.default
            } else if (schema.required) {
                throw new Error(`Missing required prop "${key}" on component "${component.name}"`)
            }
        }

        return resolved
    }
}
