import { BaseRenderer } from './BaseRenderer'
import type { ImageNode } from '../types/nodes'
import type { RenderContext } from './RenderContext'

export class ImageRenderer extends BaseRenderer<ImageNode> {
    public render(node: ImageNode, ctx: RenderContext): HTMLElement {
        const img = document.createElement('img')
        img.src = node.props.src
        img.alt = node.props.alt ?? ''
        img.classList.add('fui-image')

        return img
    }
}
