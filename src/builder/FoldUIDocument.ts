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

    public toRenderSchema(): NodeType {
        const { nodes, rootId } = this.schema

        const build = (id: string): NodeType => {
            const node = nodes[id]
            if (!node) {
                throw new Error(`Node not found: ${id}`)
            }

            const { parent, children, ...rest } = node

            return {
                ...rest,
                id: node.id,
                children: children.map(build),
            } as NodeType
        }

        return build(rootId)
    }

    public add(type: NodeType['type'], props?: any) {
        const node = this.createNode(type, props)

        return {
            into: (parentId: string, index?: number) => {
                this.attach(node, parentId, index)
                return node.id
            },
        }
    }

    public remove(nodeId: string) {
        if (nodeId === this.schema.rootId) return

        const node = this.schema.nodes[nodeId]
        if (!node) return

        node.children.forEach((childId) => this.remove(childId))

        const parent = node.parent ? this.schema.nodes[node.parent] : null

        if (parent) {
            parent.children = parent.children.filter((id) => id !== nodeId)
        }

        delete this.schema.nodes[nodeId]
    }

    public move(nodeId: string) {
        return {
            into: (newParentId: string, index?: number) => {
                this.detach(nodeId)
                const node = this.schema.nodes[nodeId]
                this.attach(node, newParentId, index)
            },
        }
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

    private attach(node: BuilderNode, parentId: string, index?: number) {
        const parent = this.schema.nodes[parentId]
        if (!parent) throw new Error('Parent not found')

        if (!this.canAcceptChild(parent.type, node.type)) {
            throw new Error(`${parent.type} cannot contain ${node.type}`)
        }

        node.parent = parentId
        this.schema.nodes[node.id] = node

        if (index === undefined) {
            parent.children.push(node.id)
        } else {
            parent.children.splice(index, 0, node.id)
        }
    }

    private detach(nodeId: string) {
        const node = this.schema.nodes[nodeId]
        if (!node || !node.parent) return

        const parent = this.schema.nodes[node.parent]
        parent.children = parent.children.filter((id) => id !== nodeId)

        node.parent = null
    }

    private canAcceptChild(parentType: NodeType['type'], childType: NodeType['type']): boolean {
        if (parentType === 'text') return false

        if (parentType === 'list') {
            return childType === 'list-item'
        }

        if (parentType === 'list-item') {
            return childType === 'text' || childType === 'image'
        }

        return true
    }
}
