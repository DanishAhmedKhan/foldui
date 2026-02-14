import type { FoldPropSchema } from '../types/FoldProp'

type InferProps<Schema extends Record<string, FoldPropSchema>> = {
    [K in keyof Schema]: Schema[K] extends { default: infer D } ? D : any
}

export interface Component<PropSchema extends Record<string, FoldPropSchema> = Record<string, FoldPropSchema>> {
    name: string

    props?: PropSchema

    defaultStyle?: Record<string, Record<string, any>>

    render(ctx: {
        id: string
        props: InferProps<PropSchema>
        el: (tag: string, part?: string) => HTMLElement
    }): HTMLElement
}
