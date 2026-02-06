import { BaseRenderer } from './BaseRenderer'
import type { ContainerNode, FlexLayout, GridLayout } from '../types/nodes'

export class ContainerRenderer extends BaseRenderer<ContainerNode> {
    protected createElement(node: ContainerNode): HTMLElement {
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

        el.style.gridTemplateColumns =
            typeof layout.columns === 'number' ? `repeat(${layout.columns}, 1fr)` : layout.columns

        if (layout.gap !== undefined) {
            el.style.gap = `${layout.gap}px`
        }
    }

    private mapAlign(value: NonNullable<FlexLayout['align']>): string {
        switch (value) {
            case 'start':
                return 'flex-start'
            case 'end':
                return 'flex-end'
            case 'center':
                return 'center'
            case 'stretch':
                return 'stretch'
        }
    }

    private mapJustify(value: NonNullable<FlexLayout['justify']>): string {
        switch (value) {
            case 'start':
                return 'flex-start'
            case 'end':
                return 'flex-end'
            case 'center':
                return 'center'
            case 'space-between':
                return 'space-between'
        }
    }
}
