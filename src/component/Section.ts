import { defineComponent } from './defineComponent'

export const Section = defineComponent({
    name: 'section',
    render: ({ node, helper }) => {
        const tag = node.props?.tag ?? 'section'
        const sectionEl = helper.el(tag, 'section')
        return sectionEl
    },
})
