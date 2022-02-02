import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { updateItem } from "../../../../libs/ddb_updateitem";
import { deleteItem } from "../../../../libs/ddb_deleteitem"
import { GetItemCommandInput, PutItemCommandInput, UpdateItemCommandInput, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"
import { marshall } from "@aws-sdk/util-dynamodb";
import { ValidateFunction } from "ajv";
import { Pipe } from "../../../utils/helper";


const validatePost = ajv.getSchema("api_club_post_schema");
const validateGet = ajv.getSchema("api_club_get_schema");
const patchSchema = ajv.getSchema("api_club_patch_schema");
const validate = (fn: ValidateFunction) => (data: Object) => { if (!fn(data)) throw new Error("api/club/: Invalid_Param"); return data }


export default async function handler(req, res) {
    var data: any = "";
    try {
        if (req.method === 'POST') {

            if (!validatePost(req.body)) throw new Error("api/club/index.ts --post: invalid Param");
            data = marshall(req.body);
            const params: PutItemCommandInput = {
                TableName: process.env.DB_CLUB_TABLENAME,
                Item: { ...data }
            };
            data = await putItem(params)
        } else if (req.method === "GET") {
            if (!validateGet(req.query)) throw new Error("api/club/index.ts --get: Invalid Param");
            const params: GetItemCommandInput = {
                TableName: process.env.DB_CLUB_TABLENAME,
                Key: {
                    clubID: {
                        S: req.query.clubID
                    }
                },
            }
            data = await getItem(params);
            // return res.status(200).json({ data: "" })

        } else if (req.method === "PATCH") {
            data = Pipe(validate(patchSchema),)(req.body)// generateUpdateParam, updateItem
            let dataKey = req.body.key;
            let dataValue = req.body.value;
            let dataAction = req.body.action;

            if (dataAction === "list_append") {
                const params: UpdateItemCommandInput = {
                    TableName: process.env.DB_CLUB_TABLENAME,
                    Key: {
                        clubID: { S: req.body.clubID },
                    },
                    UpdateExpression: `SET #key = list_append(#key, :i)`,
                    ExpressionAttributeNames: { "#key": `${dataKey}` },
                    ExpressionAttributeValues: {
                        ":i": {
                            "L": [
                                { "S": `${dataValue}` },
                            ]
                        },
                    },
                    ReturnValues: "ALL_NEW"
                };

                data = await updateItem(params)
                // data = params;
            }


        } else if (req.method === "DELETE") {

        } else {
            return res.status(400).json({ msg: "bad request" })
        }
        return res.status(200).json({ ...data })
        // return res.status(data['$metadata'].httpStatusCode).json({ ...data })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ msg: JSON.stringify(error) });
    }
}


function generateUpdateParam(params: UpdateItemCommandInput) {

    return params;
}