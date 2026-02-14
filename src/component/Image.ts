import { defineComponent } from './defineComponent'

export const Image = defineComponent({
    name: 'image',
    props: {
        src: { type: 'string', default: '' },
        alt: { type: 'string', default: 'alt' },
    },
    defaultStyle: {
        image: {
            width: '100%',
        },
    },
    render: ({ props, helper }) => {
        const imageEl = helper.el('img', 'image')
        imageEl.src = props.src
        imageEl.alt = props.alt
        return imageEl
    },
})
