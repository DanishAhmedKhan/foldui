import { defineComponent } from './defineComponent'

export const Section = defineComponent({
    name: 'section',
    props: {
        tag: { type: 'string', default: 'section' },
    },
    defaultStyle: {
        section: {
            padding: '100px 0px',
        },
    },
    render: ({ props, el }) => {
        const tag = props.tag
        const sectionEl = el(tag, 'section')
        return sectionEl
    },
})
