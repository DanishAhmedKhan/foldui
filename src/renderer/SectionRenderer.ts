import { BaseRenderer } from './BaseRenderer'
import type { SectionNode } from '../types/nodes'

export class SectionRenderer extends BaseRenderer<SectionNode> {
    protected createElement(node: SectionNode): HTMLElement {
        const tag = node.props?.tag ?? 'section'
        return document.createElement(tag)
    }
}
