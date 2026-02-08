import Ajv from 'ajv'
import schema from '../schema/content.schema.json'
import type { NodeType } from '../types/nodes'

const ajv = new Ajv()
const validate = ajv.compile(schema)

export function validateSchema(schema: unknown): asserts schema is {
    version: string
    root: NodeType
} {
    const valid = validate(schema)
    if (!valid) {
        console.error(validate.errors)
    }
}
