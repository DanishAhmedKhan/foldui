import type { ListItemNode } from '../types/nodes'
import { BaseRenderer } from './BaseRenderer'
import type { RenderContext } from './RenderContext'

export class ListItemRenderer extends BaseRenderer<ListItemNode> {
    public render(node: ListItemNode, ctx: RenderContext): HTMLElement {
        const li = document.createElement('li')
        li.classList.add('wb-list-item')

        let content: HTMLElement | DocumentFragment
        // Render children inside the list item
        if (node.children?.length) {
            content = document.createDocumentFragment()
            for (const child of node.children) {
                content.appendChild(ctx.renderNode(child))
            }
        } else {
            content = document.createTextNode('')
        }

        // Wrap with <a> if href is provided
        if (node.props?.href) {
            const a = document.createElement('a')
            a.href = node.props.href
            a.appendChild(content)
            li.appendChild(a)
        } else {
            li.appendChild(content)
        }

        return li
    }
}
