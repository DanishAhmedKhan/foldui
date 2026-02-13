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

        const mergedProps = this.mergeResponsiveProps(node)
        const props = this.resolveProps(component, mergedProps)

        const createEl = (tag: string, part?: string): HTMLElement => {
            const element = document.createElement(tag)

            if (part) {
                element.dataset.part = part
            }

            element.dataset.fuiOwner = node.id

            return element
        }

        const rootEl = component.render({
            id: node.id,
            props,
            el: createEl,
        })

        rootEl.classList.add(`fui-${node.type}`)
        rootEl.setAttribute('data-fui-id', node.id)
        rootEl.setAttribute('data-fui-type', node.type)

        if (node.children?.length) {
            for (const childNode of node.children) {
                const childEl = this.render(childNode)
                rootEl.appendChild(childEl)
            }
        }

        return rootEl
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

    private mergeResponsiveProps(node: FoldNode) {
        const baseProps = { ...(node.props || {}) }

        if (!node.responsive) return baseProps

        const width = window.innerWidth

        for (const bp in node.responsive) {
            const config = node.responsive[bp]
            if (!config?.props) continue

            if (bp === 'mobile' && width <= 768) {
                this.deepMerge(baseProps, config.props)
            }
        }

        return baseProps
    }

    private deepMerge(target: any, source: any) {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!target[key]) target[key] = {}
                this.deepMerge(target[key], source[key])
            } else {
                target[key] = source[key]
            }
        }
    }
}
