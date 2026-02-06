import type { BaseNode, NodeType } from '../types/nodes'

export class StyleEngine {
    private css: string[] = []

    public generate(schema: NodeType): string {
        this.walk(schema)
        return this.css.join('\n')
    }

    private walk(node: NodeType) {
        if (node.id) {
            this.handleBaseStyle(node)
            this.handleStateStyles(node)
            this.handleResponsiveStyles(node)
        }

        if (node.children) {
            for (const child of node.children) {
                this.walk(child)
            }
        }
    }

    private handleBaseStyle(node: BaseNode) {
        if (!node.style) return

        const selector = this.selector(node.id!)
        this.css.push(`${selector} { ${this.styleToCss(node.style)} }`)
    }

    private handleStateStyles(node: BaseNode) {
        if (!node.states) return

        for (const state in node.states) {
            const selector = `${this.selector(node.id!)}:${state}`
            this.css.push(`${selector} { ${this.styleToCss(node.states[state])} }`)
        }
    }

    private handleResponsiveStyles(node: BaseNode) {
        if (!node.responsive) return

        for (const query in node.responsive) {
            const styles = node.responsive[query]
            const selector = this.selector(node.id!)

            this.css.push(`
                @media ${query} {
                    ${selector} {
                        ${this.styleToCss(styles)}
                    }
                }
            `)
        }
    }

    private selector(id: string) {
        return `[data-foldui-id="${id}"]`
    }

    private styleToCss(style: Record<string, any>): string {
        return Object.entries(style)
            .map(([key, value]) => {
                const prop = this.toKebabCase(key)
                const val = typeof value === 'number' ? `${value}px` : value
                return `${prop}: ${val};`
            })
            .join(' ')
    }

    private toKebabCase(str: string) {
        return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    }
}
