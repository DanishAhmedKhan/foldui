import type { ListItemNode } from '../types/nodes'
import { BaseRenderer } from './BaseRenderer'

export class ListItemRenderer extends BaseRenderer<ListItemNode> {
    protected createElement(node: ListItemNode): HTMLElement {
        const li = document.createElement('li')
        li.classList.add('fui-list-item')

        if (node.props?.href) {
            const a = document.createElement('a')
            a.href = node.props.href
            li.appendChild(a)
        }

        return li
    }
}
