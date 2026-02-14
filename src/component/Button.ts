import { defineComponent } from './defineComponent'

export const Button = defineComponent({
    name: 'button',
    props: {
        link: { type: 'string', default: '#' },
        text: { type: 'string', default: 'Button' },
        icon: {
            content: { type: 'string', default: '' },
            position: { type: 'string', default: 'right' },
            spacing: { type: 'string', default: '10px' },
        },
    },
    defaultStyle: {
        button: {
            display: 'inline-flex',
            padding: '8px 16px',
            fontSize: '18px',
            outline: 'none',
            border: 'none',
            color: 'white',
            textDecoration: 'none',
        },
        icon: {
            display: 'block',
            fill: 'white',
        },
    },
    render: ({ props, el }) => {
        const buttonEl = el('a', 'button')
        buttonEl.href = props.link
        buttonEl.innerText = props.text

        let icon = props.icon?.content
        if (icon) {
            const tempEl = document.createElement('div')
            tempEl.innerHTML = icon
            icon = tempEl.firstChild
            icon.dataset.part = 'icon'

            if (props.icon.position === 'right') {
                buttonEl.append(icon)
            } else {
                buttonEl.prepend(icon)
            }

            buttonEl.style.gap = props.icon.spacing
        }

        return buttonEl
    },
})
