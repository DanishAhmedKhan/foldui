import type { BuilderDocumentSchema, BuilderNode } from '../types/builderNodes'
import type { NodeType } from '../types/nodes'

export class FoldUIDocument {
    private schema: BuilderDocumentSchema

    constructor() {
        const root = this.createNode('fragment')

        this.schema = {
            rootId: root.id,
            nodes: {
                [root.id]: root,
            },
        }
    }

    public getRootId() {
        return this.schema.rootId
    }

    public getNode(id: string): BuilderNode | undefined {
        return this.schema.nodes[id]
    }

    public getSchema(): BuilderDocumentSchema {
        return structuredClone(this.schema)
    }

    private createNode(type: NodeType['type'], props?: any): BuilderNode {
        return {
            id: crypto.randomUUID(),
            type,
            parent: null,
            children: [],
            props,
            style: {},
        } as BuilderNode
    }

    add(type: NodeType['type'], props?: any) {
        const node = this.createNode(type, props)

        return {
            into: (parentId: string, index?: number) => {
                this.attach(node, parentId, index)
                return node.id
            },
        }
    }

    add(type: NodeType['type'], props?: any) {
        const node = this.createNode(type, props)

        return {
            into: (parentId: string, index?: number) => {
                this.attach(node, parentId, index)
                return node.id
            },
        }
    }

    remove(nodeId: string) {
        if (nodeId === this.schema.rootId) return

        const node = this.schema.nodes[nodeId]
        if (!node) return

        // remove children first
        node.children.forEach((childId) => this.remove(childId))

        // detach from parent
        const parent = node.parent ? this.schema.nodes[node.parent] : null

        if (parent) {
            parent.children = parent.children.filter((id) => id !== nodeId)
        }

        delete this.schema.nodes[nodeId]
    }

    remove(nodeId: string) {
        if (nodeId === this.schema.rootId) return

        const node = this.schema.nodes[nodeId]
        if (!node) return

        // remove children first
        node.children.forEach((childId) => this.remove(childId))

        // detach from parent
        const parent = node.parent ? this.schema.nodes[node.parent] : null

        if (parent) {
            parent.children = parent.children.filter((id) => id !== nodeId)
        }

        delete this.schema.nodes[nodeId]
    }

    remove(nodeId: string) {
        if (nodeId === this.schema.rootId) return

        const node = this.schema.nodes[nodeId]
        if (!node) return

        // remove children first
        node.children.forEach((childId) => this.remove(childId))

        // detach from parent
        const parent = node.parent ? this.schema.nodes[node.parent] : null

        if (parent) {
            parent.children = parent.children.filter((id) => id !== nodeId)
        }

        delete this.schema.nodes[nodeId]
    }

    remove(nodeId: string) {
        if (nodeId === this.schema.rootId) return

        const node = this.schema.nodes[nodeId]
        if (!node) return

        // remove children first
        node.children.forEach((childId) => this.remove(childId))

        // detach from parent
        const parent = node.parent ? this.schema.nodes[node.parent] : null

        if (parent) {
            parent.children = parent.children.filter((id) => id !== nodeId)
        }

        delete this.schema.nodes[nodeId]
    }
}
