import { defineComponent } from './defineComponent'

export const Container = defineComponent({
    name: 'container',
    props: {
        layout: {
            type: 'object',
            defaultVariant: 'flex',
            variants: {
                flex: {
                    direction: { type: 'string', default: 'horizontal' },
                    align: { type: 'string', default: 'flex-start' },
                    justify: { type: 'string', default: 'center' },
                },
                grid: {
                    columns: { type: 'number', default: 3 },
                    gap: { type: 'number', default: 10 },
                },
            },
        },
        size: {
            width: { type: 'string', default: '1200px' },
            maxWidth: { type: 'string', default: '1200px' },
        },
    },
    render: ({ props, helper }) => {
        const containerEl = helper.el('div', 'container')

        const layout = props.layout

        if (layout?.type === 'flex') {
            containerEl.style.display = 'flex'

            containerEl.style.flexDirection = layout.direction === 'vertical' ? 'column' : 'row'

            containerEl.style.alignItems = layout.align

            containerEl.style.justifyContent = layout.justify
        }

        if (layout?.type === 'grid') {
            containerEl.style.display = 'grid'
            containerEl.style.gridTemplateColumns = `repeat(${layout.columns}, 1fr)`
            containerEl.style.gap = `${layout.gap}px`
        }

        return containerEl
    },
})
