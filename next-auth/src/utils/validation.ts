import Ajv from "ajv"
import { api_form_get_schema, api_form_post_schema, api_form_patch_schema, api_form_delete_schema, api_club_post_schema, api_club_get_schema } from "./schema"
const ajv = new Ajv()

ajv.addSchema(api_form_get_schema, "api_form_get_schema");
ajv.getSchema("api_form_get_schema");

ajv.addSchema(api_form_post_schema, "api_form_post_schema");
ajv.getSchema("api_form_post_schema");

ajv.addSchema(api_form_patch_schema, "api_form_patch_schema");
ajv.getSchema("api_form_patch_schema")

ajv.addSchema(api_form_delete_schema, "api_form_delete_schema");
ajv.getSchema("api_form_delete_schema")

ajv.addSchema(api_club_post_schema, "api_club_post_schema");
ajv.getSchema("api_club_post_schema");

ajv.addSchema(api_club_get_schema, "api_club_get_schema");
ajv.getSchema("api_club_get_schema")
export { ajv }



/*
 ------------some AJV notes------------------
 multiple types:            {type: ["number", "string"]}
 keywords for number:       maximum / minimum , exclusiveMaximum / exclusiveMinimum, multipleOf, 
                            {type: "number", minimum: 5}  {type: "number", multipleOf: 5}
 keyWord for string:        maxLength / minLength
                            {type: "string", maxLength: 5}
Pattern:                    param=stringRegex;  AJV uses regular expression to test the data. 
                            {type: "string", pattern: "[abc]+"}
format:                     param=string;  avaliable format: https://github.com/ajv-validator/ajv-formats
                            {type: "string", format: "ipv4"}
Keywords for arrays:        param=int;   maxItems / minItems
                            {type: "array", maxItems: 3}
uniqueItems:                 param=boolean;                                                  
                            {type: "array", uniqueItems: true}       
items:                      param=shcema;     for the data array to be valid
                            {type: "array", items: {type: "integer"}}     
                            {
                                type: "array",
                                prefixItems: [{type: "integer"}, {type: "integer"}],
                                minItems: 2
                                items: false
                            }     
                            valid [1,2]
                            invalid: [], [1], [1, 2, 3], [1, "abc"]
                            {
                                type: "array",
                                prefixItems: [{type: "integer"}, {type: "integer"}],
                                items: {type: "string"}
                            }
                            valid: [], [1, 2], [1, 2, "abc"]
                            invalid: ["abc"], [1, 2, 3]
prefixItems:                param=arrayOfSchema;    items with indices less than the number of schemas in this keyword 
                                                    must be valid according to the schemas with the same indices. 
                                                    dditional items are valid or not will depend on "items" keyword.
                            
                            {
                                type: "array",
                                prefixItems: [{type: "integer"}, {type: "string"}]
                            }
                            valid: [1], [1, "abc"], [1, "abc", 2], []
                            invalid: ["abc", 1], ["abc"]
additionalItems:            param=boolean/object;   this keyword is ignored if "items" keyword is not present or it is an object.
                            {
                                type: "array",
                                items: [{type: "integer"}, {type: "integer"}],
                                minItems: 2
                                additionalItems: false
                            }
                            invalid: invalid: [], [1], [1, 2, 3], [1, "abc"];  valid: [1,2]
                            {
                                type: "array",
                                items: [{type: "integer"}, {type: "integer"}],
                                additionalItems: true
                            }
                            valid: [], [1, 2], [1, 2, 3], [1, 2, "abc"]
                            invalid: ["abc"], [1, "abc", 3]
                            {
                                type: "array",
                                items: [{type: "integer"}, {type: "integer"}],
                                additionalItems: {type: "string"}
                            }
                            valid: [], [1, 2], [1, 2, "abc"]
                            invalid: ["abc"], [1, 2, 3]

                            
continue @                  https://ajv.js.org/json-schema.html#contains                
 */
