import type { FoldPropSchema, FoldPropsSchema } from '../types/FoldProp'

type InferProps<Schema extends FoldPropsSchema> = {
    [K in keyof Schema]: Schema[K] extends FoldPropSchema
        ? Schema[K] extends { default: infer D }
            ? D
            : any
        : Schema[K] extends FoldPropsSchema
        ? InferProps<Schema[K]>
        : never
}

export interface Component<PropSchema extends FoldPropsSchema = FoldPropsSchema> {
    name: string

    props?: PropSchema

    defaultStyle?: Record<string, Record<string, any>>

    render(ctx: { id: string; props: InferProps<PropSchema>; helper: any }): HTMLElement | DocumentFragment
}
