import { BaseRenderer } from './BaseRenderer'
import type { TextNode } from '../types/nodes'

export class TextRenderer extends BaseRenderer<TextNode> {
    public createElement(node: TextNode) {
        const tag = node.props.tag ?? 'span'
        const el = document.createElement(tag)
        el.textContent = node.props.content
        return el
    }
}
