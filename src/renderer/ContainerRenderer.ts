import { BaseRenderer } from './BaseRenderer'
import type { ContainerNode } from '../types/nodes'

export class ContainerRenderer extends BaseRenderer<ContainerNode> {
    protected createElement(): HTMLElement {
        const el = document.createElement('div')
        el.classList.add('fui-container')
        return el
    }
}
