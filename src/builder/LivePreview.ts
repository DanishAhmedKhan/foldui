import { FoldUI } from '../core/FoldUI'
import type { FoldUIDocument } from './FoldUIDocument'

export class LivePreview {
    constructor(private mount: HTMLElement) {}

    update(doc: FoldUIDocument) {
        FoldUI.render(this.mount, {
            version: '0.1.0',
            root: doc.toRenderSchema(),
        })
    }
}
