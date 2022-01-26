/*-----------------TODO---------------------

comments: 
1. don't need to delete users yet
2. don't need to update users yet
DB_USER_TABLENAME
new Error(message, fileName, lineNumber)
*/


import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { GetItemCommandInput, PutItemCommandInput, GetItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"
import { ValidateFunction } from 'ajv'
import { Pipe, Tap } from "../../../utils/helper";

const tableName = process.env.DB_USER_TABLENAME;
const postSchema = ajv.getSchema("api_user_post_schema");
const getSchema = ajv.getSchema("api_user_get_schema");
const validate = (fn: ValidateFunction) => (data: Object) => { if (!fn(data)) throw new Error("api/user: Invalid_Param"); return data }



export default async function handler(req, res) {
    var data: any = "";
    try {
        if (req.method === 'POST') {
            data = await Pipe(validate(postSchema), createPostParams, putItem,)(req.body)
        } else if (req.method === "GET") {
            let userid = req.query.userID
            if (userid) req.query.userID = Number(userid)

            data = await Pipe(validate(getSchema), createGetParams, getItem)(req.query)
            // createDefaultUserIfUndefined(data, req.query)
            // let exist = Pipe(dataExist)(data)
            // console.log(exist)
        } else if (req.method === "PATCH") {

        } else if (req.method === "DELETE") {

        } else {
            return res.status(400).json({ msg: "bad request" })
        }
        return res.status(200).json({ ...data })
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ err: JSON.stringify(error.message) });
    }
}


function createPostParams(body) {
    const params: PutItemCommandInput = {
        TableName: process.env.DB_USER_TABLENAME || tableName,
        Item: {
            userID: { S: `${body.userID}` },
            legalName: { S: body.legalName },
            clubs: { S: JSON.stringify(body.clubs) || "" },
            tasks: { S: JSON.stringify(body.tasks) || "" },
            userName: { S: body.userName || "" },
            role: { S: JSON.stringify(body.role) || "" }
        },
        ConditionExpression: 'attribute_not_exists(userID)' //throws: ConditionalCheckFailedException if userID is already exist
    };
    return params
}



function createGetParams(query) {
    return {
        TableName: process.env.DB_USER_TABLENAME || tableName,
        Key: {
            userID: {
                S: `${query.userID}`
            }
        },
    }
}

// async function createDefaultUserIfUndefined(data: GetItemCommandOutput, query) {

//     if (data.Item) { return data; }
//     generateDefaultUser()

//     // //1. generate default user
//     // //2. create default user
//     // //return response.
//     // console.log("is undefined", getItemResponse)
//     // console.log("item exist")
//     return getItemResponse;
// }

function dataExist(data: GetItemCommandOutput) {
    return (!!data.Item)
}

function generateDefaultUser(userID: number) {
    return {
        userID,
        clubs: [],
        tasks: [],
        userName: "myUserName",
        legalName: "myLegalName",
        role: [
            "member"
        ]
    }
}



