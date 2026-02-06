import type { NodeType } from '../types/nodes'
import type { BaseRenderer } from './BaseRenderer'

type RendererMap = {
    [K in NodeType['type']]: BaseRenderer<Extract<NodeType, { type: K }>>
}

export class RendererRegistry {
    private renderers = new Map<string, BaseRenderer<any>>()

    public register<T extends NodeType>(type: T['type'], renderer: BaseRenderer<T>) {
        this.renderers.set(type, renderer)
    }

    public get(type: string): BaseRenderer<any> {
        const renderer = this.renderers.get(type)
        if (!renderer) {
            throw new Error(`No renderer registered for type: ${type}`)
        }
        return renderer
    }
}
