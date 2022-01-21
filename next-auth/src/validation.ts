import Ajv from "ajv"
// import * as schema_user from "./schema_user.json"
// import * as schema_document from "./schema_document.json"
import { getItemSchema } from "./schema"
export const ajv = new Ajv()
ajv.addSchema(getItemSchema, "getItemSchema");
ajv.getSchema("getItemSchema");
// ajv.addSchema(schema_document, "document")