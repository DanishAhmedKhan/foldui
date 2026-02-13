import type { ComponentRegistry } from '../core/ComponentRegistry'
import type { FoldNode } from '../types/FoldNode'
export class StyleEngine {
    private css: string[] = []
    private emittedComponents = new Set<string>()

    constructor(private registry: ComponentRegistry, private breakpoints: Record<string, string> = {}) {}

    public generate(root: FoldNode): string {
        this.css = []
        this.emittedComponents.clear()

        this.walk(root)

        return this.css.join('\n')
    }

    private walk(node: FoldNode) {
        this.handleComponentDefaultStyle(node)
        this.handleInstanceStyle(node)
        this.handleResponsiveStyles(node)

        if (node.children?.length) {
            for (const child of node.children) {
                this.walk(child)
            }
        }
    }

    // 🔹 Emit component-level default style ONCE
    private handleComponentDefaultStyle(node: FoldNode) {
        const component = this.registry.get(node.type)
        if (!component?.defaultStyle) return

        if (this.emittedComponents.has(node.type)) return

        const selector = `.fui-${node.type}`
        this.pushRule(selector, component.defaultStyle)

        this.emittedComponents.add(node.type)
    }

    // 🔹 Emit only user style for this specific node
    private handleInstanceStyle(node: FoldNode) {
        if (!node.style || !Object.keys(node.style).length) return

        const selector = this.selector(node.id)
        this.pushRule(selector, node.style)
    }

    private handleResponsiveStyles(node: FoldNode) {
        if (!node.responsive) return

        for (const bp in node.responsive) {
            const config = node.responsive[bp]
            if (!config?.style) continue

            const mediaQuery = this.breakpoints[bp]
            if (!mediaQuery) continue

            const selector = this.selector(node.id)

            this.css.push(`@media ${mediaQuery} { ${selector} { ${this.styleToCss(config.style)} } }`)
        }
    }

    private pushRule(selector: string, style: Record<string, any>) {
        if (!Object.keys(style).length) return
        this.css.push(`${selector} { ${this.styleToCss(style)} }`)
    }

    private selector(id: string) {
        return `[data-fui-id="${id}"]`
    }

    private styleToCss(style: Record<string, any>): string {
        return Object.entries(style)
            .map(([key, value]) => {
                if (value == null) return ''

                const prop = this.toKebabCase(key)

                const val = typeof value === 'number' && !this.isUnitless(prop) ? `${value}px` : String(value)

                return `${prop}: ${val};`
            })
            .filter(Boolean)
            .join(' ')
    }

    private toKebabCase(str: string) {
        return str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
    }

    private unitless = new Set(['opacity', 'z-index', 'font-weight', 'line-height', 'flex', 'flex-grow', 'flex-shrink'])

    private isUnitless(prop: string) {
        return this.unitless.has(prop)
    }
}
