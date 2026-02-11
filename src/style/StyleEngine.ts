import type { ComponentRegistry } from '../core/ComponentRegistry'
import type { FoldNode } from '../types/FoldNode'

export class StyleEngine {
    private css: string[] = []

    constructor(private registry: ComponentRegistry) {}

    public generate(root: FoldNode): string {
        this.css = [] // reset on every run
        this.walk(root)
        return this.css.join('\n')
    }

    private walk(node: FoldNode) {
        if (node.id) {
            this.handleBaseStyle(node)
            this.handleStateStyles(node)
            this.handleResponsiveStyles(node)
        }

        if (node.children?.length) {
            for (const child of node.children) {
                this.walk(child)
            }
        }
    }

    private handleBaseStyle(node: FoldNode) {
        const component = this.registry.get(node.type)
        const defaultStyle = component?.defaultStyle
        const userStyle = node.style

        if (!defaultStyle && !userStyle) return

        const merged = {
            ...(defaultStyle ?? {}),
            ...(userStyle ?? {}),
        }

        if (!Object.keys(merged).length) return

        const selector = this.selector(node.id!)
        this.css.push(`${selector} { ${this.styleToCss(merged)} }`)
    }

    private handleStateStyles(node: FoldNode) {
        if (!node.states) return

        for (const state in node.states) {
            const styles = node.states[state]
            if (!styles || !Object.keys(styles).length) continue

            const selector = `${this.selector(node.id!)}:${state}`
            this.css.push(`${selector} { ${this.styleToCss(styles)} }`)
        }
    }

    private handleResponsiveStyles(node: FoldNode) {
        if (!node.responsive) return

        for (const query in node.responsive) {
            const styles = node.responsive[query]
            if (!styles || !Object.keys(styles).length) continue

            const selector = this.selector(node.id!)
            this.css.push(`@media ${query} { ${selector} { ${this.styleToCss(styles)} } }`)
        }
    }

    private selector(id: string) {
        return `[data-foldui-id="${id}"]`
    }

    private styleToCss(style: Record<string, any>): string {
        return Object.entries(style)
            .map(([key, value]) => {
                const prop = this.toKebabCase(key)

                if (value == null) return ''

                const val = typeof value === 'number' && prop !== 'opacity' ? `${value}px` : String(value)

                return `${prop}: ${val};`
            })
            .filter(Boolean)
            .join(' ')
    }

    private toKebabCase(str: string) {
        return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    }
}
