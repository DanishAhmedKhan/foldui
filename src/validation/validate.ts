import Ajv from 'ajv'
import schema from '../schema/content.schema.json'
import type { FoldUIDocument } from '../core/FoldUI'

const ajv = new Ajv()
const validate = ajv.compile(schema)

export function validateSchema(schema: unknown): asserts schema is FoldUIDocument {
    const valid = validate(schema)
    if (!valid) {
        console.error(validate.errors)
    }
}
