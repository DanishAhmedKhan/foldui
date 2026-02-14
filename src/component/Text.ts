import { defineComponent } from './defineComponent'

export const Text = defineComponent({
    name: 'text',
    props: {
        tag: { type: 'string', default: 'span' },
        text: { type: 'string', default: 'This is a text' },
    },
    defaultStyle: {
        text: {
            fontSize: '16px',
            color: '#333',
        },
    },
    render: ({ props, helper }) => {
        const tag = props.tag
        const textEl = helper.el(tag, 'text')
        textEl.textContent = props.text
        return textEl
    },
})
