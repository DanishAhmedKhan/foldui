import Ajv from 'ajv'
import schema from '../schema/content.schema.json'

const ajv = new Ajv()
const validateFn = ajv.compile(schema)

export function validateSchema(data: unknown): boolean {
    const valid = validateFn(data)
    if (!valid) {
        console.error(validateFn.errors)
    }
    return valid
}
