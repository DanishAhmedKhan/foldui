import type { FoldPropSchema } from '../types/FoldProp'

export interface Component<Props extends Record<string, any> = Record<string, any>> {
    name: string

    allowChildren: boolean

    props?: Record<keyof Props, FoldPropSchema>

    render(ctx: { id: string; props: Props; children?: HTMLElement[] }): HTMLElement
}
