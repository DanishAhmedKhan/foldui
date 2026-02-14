import type { Component } from '../core/Component'
import type { FoldPropsSchema } from '../types/FoldProp'

export function defineComponent<Schema extends FoldPropsSchema>(component: Component<Schema>): Component<Schema> {
    return component
}
