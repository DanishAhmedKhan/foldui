import { defineComponent } from './defineComponent'

export const Image = defineComponent({
    name: 'image',
    render: ({ node, helper }) => {
        const imageEl = helper.el('img', 'image')
        imageEl.src = node.props?.src
        imageEl.alt = node.props?.alt
        return imageEl
    },
})
