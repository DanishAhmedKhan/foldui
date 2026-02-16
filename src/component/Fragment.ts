import { defineComponent } from './defineComponent'

export const Fragment = defineComponent({
    name: 'fragment',
    render: () => {
        const fragEl = document.createDocumentFragment()
        return fragEl
    },
})
