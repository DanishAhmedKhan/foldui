import { FragmentRenderer } from '../renderer/FragmentRenderer'
import { ContainerRenderer } from '../renderer/ContainerRenderer'
import { SectionRenderer } from '../renderer/SectionRenderer'
import { TextRenderer } from '../renderer/TextRenderer'
import { ImageRenderer } from '../renderer/ImageRenderer'
import { ButtonRenderer } from '../renderer/ButtonRenderer'
import { ListItemRenderer } from '../renderer/ListItemRenderer'
import { ListRenderer } from '../renderer/ListRenderer'
import { MasterRenderer } from '../renderer/MasterRenderer'
import { NodeNormalizer } from '../node/NodeNormalizer'
import { RendererRegistry } from '../renderer/RendererRegistry'
import { StyleEngine } from '../style/StyleEngine'
import { validateSchema } from '../validation/validate'
import type { NodeType } from '../types/nodes'

export type FoldUISchema = unknown

export interface FoldUIDocument {
    version: string
    root: NodeType
}

export class FoldUI {
    private static createRenderer(): MasterRenderer {
        const registry = new RendererRegistry()

        registry.register('fragment', new FragmentRenderer())
        registry.register('container', new ContainerRenderer())
        registry.register('section', new SectionRenderer())
        registry.register('text', new TextRenderer())
        registry.register('image', new ImageRenderer())
        registry.register('button', new ButtonRenderer())
        registry.register('list', new ListRenderer())
        registry.register('list-item', new ListItemRenderer())

        return new MasterRenderer(registry)
    }

    private static prepare(schema: FoldUISchema): NodeType {
        validateSchema(schema)

        const normalizer = new NodeNormalizer()
        const normalizedRoot = normalizer.normalize(schema.root)

        return normalizedRoot
    }

    public static render(containerEl: HTMLElement, schema: FoldUISchema) {
        const rootNode = FoldUI.prepare(schema)
        const renderer = FoldUI.createRenderer()

        const styleEngine = new StyleEngine()
        const css = styleEngine.generate(rootNode)

        const styleTag = document.createElement('style')
        styleTag.textContent = css

        containerEl.innerHTML = ''
        containerEl.appendChild(styleTag)
        containerEl.appendChild(renderer.renderToDom(rootNode))
    }

    public static getHtml(schema: FoldUISchema): string {
        const rootNode = FoldUI.prepare(schema)
        const renderer = FoldUI.createRenderer()

        return renderer.renderToString(rootNode)
    }
}
