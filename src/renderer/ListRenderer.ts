import { BaseRenderer } from './BaseRenderer'
import type { ListNode } from '../types/nodes'
import type { RenderContext } from './RenderContext'

export class ListRenderer extends BaseRenderer<ListNode> {
    public render(node: ListNode, ctx: RenderContext): HTMLElement {
        const tag = node.props?.tag ?? 'ul'
        const listEl = document.createElement(tag)
        listEl.classList.add('wb-list')

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

        if (node.children?.length) {
            for (const child of node.children) {
                const childEl = ctx.renderNode(child)
                const li = document.createElement('li')
                li.appendChild(childEl)
                listEl.appendChild(li)
            }
        }

        return listEl
    }
}
