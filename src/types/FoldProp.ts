export type FoldPropType = 'string' | 'number' | 'boolean' | 'object' | 'array'

export interface FoldPropSchema {
    type: FoldPropType
    required?: boolean
    default?: any
}
