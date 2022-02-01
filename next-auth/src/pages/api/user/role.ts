/*-----------------TODO---------------------
1. create schema

*/
import { putItem } from "../../../../libs/ddb_putitem";
import { ajv } from "../../../utils/validation"
import { ValidateFunction } from 'ajv'
import { Pipe, Tap, } from "../../../utils/helper";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { updateItem } from "../../../../libs/ddb_updateitem";


const tableName = process.env.DB_USER_TABLENAME;
const postSchema = ajv.getSchema("api_user_role_post_schema");
const validate = (fn: ValidateFunction) => (data: Object) => { if (!fn(data)) throw new Error("api/user/role: Invalid_Param"); return data }


export default async function handler(req, res) {
    var data: any = "";
    try {
        if (req.method === 'POST') {

            data = Pipe(validate(postSchema), generateUpdateItemParams, updateItem)(req.body)

        } else {
            return res.status(400).json({ msg: "bad request" })
        }
        return res.status(200).json({ ...data })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ err: JSON.stringify(error.message) });
    }
}


function generateUpdateItemParams(body: postBodyType) {
    const params: UpdateItemCommandInput = {
        TableName: process.env.DB_USER_TABLENAME || tableName,
        Key: {
            userID: { S: body.userID },
        },
        ExpressionAttributeNames: {
            "#r": "role"
        },
        ExpressionAttributeValues: {
            ":t": { S: JSON.stringify(body.role) },
        },
        UpdateExpression: `set #r = :t`,
        ReturnValues: "ALL_NEW"
    };
    return params;
}


type postBodyType = {
    userID: 'string',
    role: Array<string>,
}