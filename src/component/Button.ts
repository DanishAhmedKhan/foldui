import { defineComponent } from './defineComponent'

export const Button = defineComponent({
    name: 'button',
    render: ({ node, helper }) => {
        const buttonEl = helper.el('a', 'button')
        buttonEl.href = node.props?.link
        buttonEl.innerText = node.props?.text ?? 'Button'

        Object.assign(buttonEl.style, {
            background: 'black',
            padding: '10px 20px',
            color: 'white',
            textDecoration: 'none',
        })

        const iconContent = node.props?.icon?.content

        if (iconContent) {
            const tempEl = document.createElement('div')
            tempEl.innerHTML = iconContent

            const iconEl = tempEl.firstElementChild

            if (iconEl instanceof Element) {
                iconEl.setAttribute('data-part', 'icon')

                if (node.props?.icon.position === 'right') {
                    buttonEl.append(iconEl)
                } else {
                    buttonEl.prepend(iconEl)
                }

                buttonEl.style.gap = node.props?.icon.spacing
            }
        }

        return buttonEl
    },
})
