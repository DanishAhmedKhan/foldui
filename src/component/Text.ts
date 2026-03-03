import { defineComponent } from './defineComponent'

export const Text = defineComponent({
    name: 'text',

    render: ({ node, helper }) => {
        const tag = node.props?.tag ?? 'h1'
        const content = node.props?.content ?? 'This is a text'

        const textEl = helper.el(tag, 'text')
        textEl.textContent = content

        return textEl
    },
})
