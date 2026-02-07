import type { ButtonNode } from '../types/nodes'
import { BaseRenderer } from './BaseRenderer'

export class ButtonRenderer extends BaseRenderer<ButtonNode> {
    protected createElement(node: ButtonNode): HTMLElement {
        const btn = document.createElement('button')

        btn.textContent = node.props.label
        btn.type = node.props.variant ?? 'button'

        if (node.props.disabled) {
            btn.disabled = true
        }

        return btn
    }
}
