import type { ContainerLayout, ContainerNode, ContainerSize, FlexLayout, GridLayout } from '../../types/nodes'

export function computeContainerStyles(node: ContainerNode): Record<string, any> {
    return {
        ...computeLayout(node.props?.layout),
        ...computeContainerSize(node.props?.size),
    }
}

function computeLayout(layout?: ContainerLayout): Record<string, any> {
    if (!layout) return {}

    if (layout.type === 'flex') {
        return computeFlex(layout)
    }

    if (layout.type === 'grid') {
        return computeGrid(layout)
    }

    return {}
}

function computeFlex(layout: FlexLayout): Record<string, any> {
    const styles: Record<string, any> = {
        display: 'flex',
    }

    if (layout.direction) {
        styles.flexDirection = layout.direction
    }

    if (layout.align) {
        styles.alignItems = mapAlign(layout.align)
    }

    if (layout.justify) {
        styles.justifyContent = mapJustify(layout.justify)
    }

    if (layout.gap !== undefined) {
        styles.gap = layout.gap
    }

    return styles
}

function computeGrid(layout: GridLayout): Record<string, any> {
    return {
        display: 'grid',
        gridTemplateColumns: typeof layout.columns === 'number' ? `repeat(${layout.columns}, 1fr)` : layout.columns,
        ...(layout.gap !== undefined ? { gap: layout.gap } : {}),
    }
}

function computeContainerSize(size?: ContainerSize): Record<string, any> {
    if (!size) return {}

    const styles: Record<string, any> = {}

    if (size.width === 'full') {
        styles.width = '100%'
        styles.maxWidth = 'none'
    }

    if (size.width === 'content') {
        styles.width = '100%'
        if (size.maxWidth) {
            styles.maxWidth = size.maxWidth
        }
        if (size.center) {
            styles.marginLeft = 'auto'
            styles.marginRight = 'auto'
        }
    }

    return styles
}

function mapAlign(value: FlexLayout['align']) {
    return {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        stretch: 'stretch',
    }[value!]
}

function mapJustify(value: FlexLayout['justify']) {
    return {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        'space-between': 'space-between',
    }[value!]
}
