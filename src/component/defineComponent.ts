import type { Component } from '../core/Component'
import type { FoldPropSchema } from '../types/FoldProp'

export function defineComponent<Schema extends Record<string, FoldPropSchema>>(
    component: Component<Schema>,
): Component<Schema> {
    return component
}
