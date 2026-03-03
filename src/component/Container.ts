import { defineComponent } from './defineComponent'

export const Container = defineComponent({
    name: 'container',
    render: ({ helper }) => {
        const containerEl = helper.el('div', 'container')
        return containerEl
    },
})
