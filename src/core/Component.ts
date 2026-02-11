import type { FoldPropSchema } from '../types/FoldProp'

export interface Component<Props extends Record<string, any> = Record<string, any>> {
    name: string

    props?: Record<keyof Props, FoldPropSchema>

    defaultStyle?: Record<string, string>

    render(ctx: { id: string; props: Props }): HTMLElement
}
