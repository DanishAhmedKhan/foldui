import { BaseRenderer } from './BaseRenderer'
import type { TextNode } from '../types/nodes'

export class TextRenderer extends BaseRenderer<TextNode> {
    public render(node: TextNode) {
        const el = document.createElement(node.props.tag ?? 'span')
        el.textContent = node.props.content
        return el
    }
}
