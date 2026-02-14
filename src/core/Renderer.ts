import type { FoldNode } from '../types/FoldNode'
import type { FoldPropsSchema } from '../types/FoldProp'
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

        const helper = this.createRenderHelper(node)

        const rootEl = component.render({
            id: node.id,
            props,
            helper,
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

    private resolveProps(component: Component<any>, incomingProps: Record<string, any> = {}): Record<string, any> {
        const schema = component.props
        if (!schema) return incomingProps

        const resolve = (schemaObj: FoldPropsSchema, provided: Record<string, any> = {}): Record<string, any> => {
            const result: Record<string, any> = {}

            for (const key in schemaObj) {
                const schemaValue = schemaObj[key]
                const userValue = provided?.[key]

                if ('type' in schemaValue) {
                    if (userValue !== undefined) {
                        result[key] = userValue
                    } else if ('default' in schemaValue) {
                        result[key] = schemaValue.default
                    } else {
                        result[key] = undefined
                    }
                } else {
                    result[key] = resolve(schemaValue as FoldPropsSchema, userValue || {})
                }
            }

            return result
        }

        return resolve(schema, incomingProps)
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

    private createRenderHelper(node: FoldNode) {
        return {
            el: <K extends string>(
                tag: K,
                part?: string,
            ): K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : HTMLElement => {
                const element = document.createElement(tag)

                if (part) {
                    element.setAttribute('data-part', part)
                }

                element.setAttribute('data-fui-owner', node.id)

                return element as any
            },

            createSvg(svgString: string) {
                const template = document.createElement('template')
                template.innerHTML = svgString.trim()
                return template.content.firstElementChild as SVGElement
            },
        }
    }
}
