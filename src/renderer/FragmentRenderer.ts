import { BaseRenderer } from './BaseRenderer'
import type { FragmentNode } from '../types/nodes'

export class FragmentRenderer extends BaseRenderer<FragmentNode> {
    protected createElement(_: FragmentNode): DocumentFragment {
        return document.createDocumentFragment()
    }
}
