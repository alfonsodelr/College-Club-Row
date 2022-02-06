import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { updateItem } from "../../../../libs/ddb_updateitem";
import { deleteItem } from "../../../../libs/ddb_deleteitem"
import { GetItemCommandInput, PutItemCommandInput, UpdateItemCommandInput, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"
import { marshall } from "@aws-sdk/util-dynamodb";
import { ValidateFunction } from "ajv";
import { Pipe, validateRole } from "../../../utils/helper";
import cookies from "../../../utils/cookies.js"

const validatePost = ajv.getSchema("api_club_post_schema");
const validateGet = ajv.getSchema("api_club_get_schema");
const patchSchema = ajv.getSchema("api_club_patch_schema");
const validate = (fn: ValidateFunction) => (data: Object) => { if (!fn(data)) throw new Error("api/club/: Invalid_Param"); return data }


async function handler(req, res) {
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

            res.cookie('clubGetCookie', 'api-yayayayaya!')
            // Return the `set-cookie` header so we can display it in the browser and show that it works!
        } else if (req.method === "PATCH") {
            data = await Pipe(validate(patchSchema), generateUpdateParam, update)(req.body)

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


export default cookies(handler)


function generateUpdateParam(body) {
    let dataAction = body.action;

    if (dataAction === "append_role") {
        let dataKey = body.key;
        let dataValue = body.value;
        let userRole = validateRole(body.key.slice(0, -1))

        const club_params: UpdateItemCommandInput = {
            TableName: process.env.DB_CLUB_TABLENAME,
            Key: {
                clubID: { S: body.clubID },
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

        const user_params: UpdateItemCommandInput = {
            TableName: process.env.DB_USER_TABLENAME,
            Key: {
                userID: { S: body.value }, //since body.value is userID wich will be stored in club.members[]
            },
            UpdateExpression: `SET #key = list_append(#key, :i)`,
            ExpressionAttributeNames: { "#key": `role` },
            ExpressionAttributeValues: {
                ":i": {
                    "L": [
                        { "S": `${userRole}@${body.clubID}` },
                    ]
                },
            },
            ReturnValues: "ALL_NEW"
        };
        //["member@body.clubID"]


        // data = await updateItem(params)
        // data = params;
        return { ...body, club_params, user_params };
    }

    throw new Error("api/club generateUpdateParam action not found");
}

async function update(body) {
    if (body.action === "append_role") {
        var clubResponse = await updateItem(body.club_params);
        var userResponse = await updateItem(body.user_params);
        if (clubResponse['$metadata'].httpStatusCode === 200 && userResponse['$metadata'].httpStatusCode === 200) {
            return { ...body, clubResponse, userResponse }
        } else {
            throw new Error("api/club Update response status != 200.\n" + clubResponse + userResponse);
        }
    }

    throw new Error("api/club UPdate action not found");
}