import { BaseRenderer } from './BaseRenderer'
import type { ListNode } from '../types/nodes'

export class ListRenderer extends BaseRenderer<ListNode> {
    protected createElement(node: ListNode): HTMLElement {
        const tag = node.props?.tag ?? 'ul'
        const listEl = document.createElement(tag)
        listEl.classList.add('fui-list')

        switch (node.props?.variant) {
            case 'horizontal':
                listEl.style.display = 'flex'
                listEl.style.flexDirection = 'row'
                listEl.style.gap = '8px'
                break

            case 'grid':
                listEl.style.display = 'grid'
                listEl.style.gridTemplateColumns = 'repeat(auto-fit, minmax(100px, 1fr))'
                listEl.style.gap = '8px'
                break

            case 'vertical':
            default:
                listEl.style.display = 'block'
                break
        }

        return listEl
    }
}
