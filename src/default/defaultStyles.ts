import type { NodeType } from '../types/nodes'

type DefaultStyleMap = Partial<Record<NodeType['type'], Record<string, any>>>

export const DEFAULT_STYLES: DefaultStyleMap = {
    section: {
        display: 'block',
        width: '100%',
    },

    container: {
        display: 'flex',
        width: '100%',
    },

    text: {
        fontSize: '16px',
        lineHeight: '1.4',
    },

    image: {
        maxWidth: '100%',
        display: 'block',
    },

    button: {
        padding: '8px 14px',
        borderRadius: 6,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },

    list: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
    },

    'list-item': {
        cursor: 'pointer',
    },
}
