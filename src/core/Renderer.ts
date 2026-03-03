import type { FoldNode } from '../types/FoldNode'
import type { ComponentRegistry } from './ComponentRegistry'
import type { RendererPlugin } from './RendererPlugin'
import type { StyleEngine } from './StyleEngine'

export class Renderer {
    private plugins: RendererPlugin[] = []

    constructor(private registry: ComponentRegistry, private styleEngine: StyleEngine) {}

    public use(plugin: RendererPlugin) {
        this.plugins.push(plugin)
    }

    public render(node: FoldNode): HTMLElement | DocumentFragment {
        const component = this.registry.get(node.type)

        if (!component) {
            throw new Error(`Unknown component "${node.type}"`)
        }

        const props = { ...(node.props || {}) }

        for (const plugin of this.plugins) {
            plugin.beforeRender?.({ node, props, styleEngine: this.styleEngine })
        }

        const helper = this.createRenderHelper()

        const rootEl = component.render({
            node,
            helper,
        })

        if (rootEl instanceof HTMLElement) {
            rootEl.classList.add(`fui-${node.type}`)
            rootEl.setAttribute('data-fui-id', node.id)
            rootEl.setAttribute('data-fui-type', node.type)
        }

        for (const plugin of this.plugins) {
            plugin.afterRender?.({ node, element: rootEl })
        }

        if (node.children?.length) {
            for (const childNode of node.children) {
                const childEl = this.render(childNode)
                rootEl.appendChild(childEl)
            }
        }

        return rootEl
    }

    private createRenderHelper() {
        return {
            el: <K extends string>(
                tag: K,
                part?: string,
            ): K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : HTMLElement => {
                const element = document.createElement(tag)

                if (part) {
                    element.setAttribute('data-part', part)
                }

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
