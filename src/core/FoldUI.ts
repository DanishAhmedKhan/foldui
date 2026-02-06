import { ContainerRenderer } from '../renderer/ContainerRenderer'
import { FragmentRenderer } from '../renderer/FragmentRenderer'
import { ImageRenderer } from '../renderer/ImageRenderer'
import { ListItemRenderer } from '../renderer/ListItemRenderer'
import { ListRenderer } from '../renderer/ListRenderer'
import { MasterRenderer } from '../renderer/MasterRenderer'
import { RendererRegistry } from '../renderer/RendererRegistry'
import { TextRenderer } from '../renderer/TextRenderer'
import { StyleEngine } from '../style/StyleEngine'
import type { NodeType } from '../types/nodes'

export type FoldUISchema = unknown

export class FoldUI {
    private static createRenderer(): MasterRenderer {
        const registry = new RendererRegistry()

        registry.register('fragment', new FragmentRenderer())
        registry.register('container', new ContainerRenderer())
        registry.register('text', new TextRenderer())
        registry.register('image', new ImageRenderer())
        registry.register('list', new ListRenderer())
        registry.register('list-item', new ListItemRenderer())

        return new MasterRenderer(registry)
    }

    public static render(containerEl: HTMLElement, schema: FoldUISchema) {
        const renderer = FoldUI.createRenderer()

        const styleEngine = new StyleEngine()
        const css = styleEngine.generate(schema)

        const styleTag = document.createElement('style')
        styleTag.innerHTML = css

        containerEl.innerHTML = ''
        containerEl.appendChild(styleTag)
        containerEl.appendChild(renderer.renderToDom(schema))

        // const html = FoldUI.getHtml(schema)
        // containerEl.innerHTML = html
    }

    public static getHtml(schema: FoldUISchema): string {
        const renderer = FoldUI.createRenderer()
        return renderer.renderToString(schema as NodeType)
    }
}
