import { BaseRenderer } from './BaseRenderer'
import type { ContainerNode, FlexLayout, GridLayout } from '../types/nodes'
import type { RenderContext } from './RenderContext'
export class ContainerRenderer extends BaseRenderer<ContainerNode> {
    public render(node: ContainerNode, ctx: RenderContext): HTMLElement {
        const el = document.createElement('div')
        el.classList.add('fui-container')

        const layout = node.props?.layout
        if (!layout) return el

        if (layout.type === 'flex') {
            this.applyFlexLayout(el, layout)
        }

        if (layout.type === 'grid') {
            this.applyGridLayout(el, layout)
        }

        if (node.children?.length) {
            for (const child of node.children) {
                el.appendChild(ctx.renderNode(child))
            }
        }

        return el
    }

    private applyFlexLayout(el: HTMLElement, layout: FlexLayout) {
        el.style.display = 'flex'

        if (layout.direction) {
            el.style.flexDirection = layout.direction
        }

        if (layout.align) {
            el.style.alignItems = this.mapAlign(layout.align)
        }

        if (layout.justify) {
            el.style.justifyContent = this.mapJustify(layout.justify)
        }

        if (layout.gap !== undefined) {
            el.style.gap = `${layout.gap}px`
        }
    }

    private applyGridLayout(el: HTMLElement, layout: GridLayout) {
        el.style.display = 'grid'

        if (typeof layout.columns === 'number') {
            el.style.gridTemplateColumns = `repeat(${layout.columns}, 1fr)`
        } else {
            el.style.gridTemplateColumns = layout.columns
        }

        if (layout.gap !== undefined) {
            el.style.gap = `${layout.gap}px`
        }
    }

    private mapAlign(value: FlexLayout['align']) {
        switch (value) {
            case 'start':
                return 'flex-start'
            case 'end':
                return 'flex-end'
            case 'center':
                return 'center'
            case 'stretch':
                return 'stretch'
            default:
                return 'stretch'
        }
    }

    private mapJustify(value: FlexLayout['justify']) {
        switch (value) {
            case 'start':
                return 'flex-start'
            case 'end':
                return 'flex-end'
            case 'center':
                return 'center'
            case 'space-between':
                return 'space-between'
            default:
                return 'flex-start'
        }
    }
}
