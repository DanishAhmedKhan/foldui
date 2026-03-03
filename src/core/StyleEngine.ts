export class StyleEngine {
    private css: string[] = []

    public reset() {
        this.css = []
    }

    public push(selector: string, style: Record<string, any>) {
        if (!style || !Object.keys(style).length) return
        this.css.push(`${selector} { ${this.styleToCss(style)} }`)
    }

    public pushRaw(css: string) {
        if (!css) return
        this.css.push(css)
    }

    public toString(): string {
        return this.css.join('\n')
    }

    public styleToCss(style: Record<string, any>): string {
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
