import type { NodeType } from '../types/nodes'

export class NodeNormalizer {
    private idCounter = 0

    public normalize(schema: NodeType): NodeType {
        return this.cloneAndNormalize(schema)
    }

    private cloneAndNormalize<T extends NodeType>(node: T): T {
        const cloned: any = {
            ...node,
            id: node.id ?? this.generateId(),
        }

        if (node.children?.length) {
            cloned.children = node.children.map((child) => this.cloneAndNormalize(child))
        }

        return cloned
    }

    private generateId(): string {
        this.idCounter += 1
        return `foldui-${this.idCounter}`
    }
}
