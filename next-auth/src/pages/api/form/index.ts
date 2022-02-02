import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { updateItem } from "../../../../libs/ddb_updateitem";
import { deleteItem } from "../../../../libs/ddb_deleteitem"
import { GetItemCommandInput, PutItemCommandInput, UpdateItemCommandInput, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"



const validateGet = ajv.getSchema("api_form_get_schema")
const validatePost = ajv.getSchema("api_form_post_schema")
const validatePatch = ajv.getSchema("api_form_patch_schema")
const validateDelete = ajv.getSchema("api_form_delete_schema")
function arrObjectTodbMap(param: object[]) {
    param.map(item => {
        let key = Object.keys(item)[0];
        let val = item[key]
        return {
            M: { [key]: { S: val } }
        }
    })
}


export default async function handler(req, res) {
    var data: any;
    try {
        if (req.method === 'POST') {
            var d = req.body.Item.tags;
            if (!validatePost(req.body)) throw new Error("api/form/index.ts --post: invalid Param");
            const params: PutItemCommandInput = {
                TableName: process.env.DB_CLUB_FORM_TABLENAME,
                Item: {
                    clubID: { S: req.body.Item.clubID },
                    formID: { S: req.body.Item.formID },
                    tags: {
                        S: JSON.stringify(req.body.Item.tags)
                    }
                }
            };
            data = await putItem(params)
        } else if (req.method === "GET") {
            // + might have to remove the Key from req.body schema.
            if (!validateGet(req.body)) throw new Error("api/form/index.ts --get: Invalid Param");
            const params: GetItemCommandInput = {
                TableName: process.env.DB_CLUB_FORM_TABLENAME,
                Key: {
                    clubID: {
                        S: req.body.clubID
                    },
                    formID: {
                        S: req.body.formID
                    }
                },
            }
            data = await getItem(params);
        } else if (req.method === "PATCH") {
            if (!validatePatch(req.body)) throw new Error("api/form/index.js --patch: invalid Param");

            let dataKey = Object.keys(req.body.data)[0];
            let dataValue = req.body.data[dataKey];
            const params: UpdateItemCommandInput = {
                TableName: process.env.DB_CLUB_FORM_TABLENAME,
                Key: {
                    clubID: { S: req.body.clubID },
                    formID: { S: req.body.formID },
                },
                UpdateExpression: `set ${dataKey} = :t`,
                ExpressionAttributeValues: {
                    ":t": { S: JSON.stringify(dataValue) },
                },
                ReturnValues: "ALL_NEW"
            };

            data = await updateItem(params)
        } else if (req.method === "DELETE") {
            if (!validateDelete(req.body)) throw new Error("api/form/index.js --delete: invalid Param");

            const params: DeleteItemCommandInput = {
                TableName: process.env.DB_CLUB_FORM_TABLENAME,
                Key: {
                    clubID: { S: req.body.clubID },
                    formID: { S: req.body.formID },
                },
            };

            data = await deleteItem(params)
        } else {
            return res.status(400).json({ msg: "bad request" })
        }

        return res.status(data['$metadata'].httpStatusCode).json({ data })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ msg: JSON.stringify(error) });
    }
}
