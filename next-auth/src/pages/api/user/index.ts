/*-----------------TODO---------------------


*/
import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { deleteItem } from "../../../../libs/ddb_deleteitem";
import { GetItemCommandInput, PutItemCommandInput, GetItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"
import { ValidateFunction } from 'ajv'
import { Pipe, Tap } from "../../../utils/helper";



const tableName = process.env.DB_USER_TABLENAME;
const postSchema = ajv.getSchema("api_user_post_schema");
const getSchema = ajv.getSchema("api_user_get_schema");
const deleteSchema = ajv.getSchema("api_user_delete_schema")
const validate = (fn: ValidateFunction) => (data: Object) => { if (!fn(data)) throw new Error("api/user: Invalid_Param"); return data }

type userType = {
    userID: number | string,
    clubs: Array<string>,
    tasks: Array<string>,
    userName: string,
    legalName: string,
    role: Array<string>,
    email: string,
}

type GETQuery = {
    userID: number,
    email: string,
    legalName: string,
}

type POSTBody = {
    userID: number,
    clubs: Array<string>,
    tasks: Array<string>,
    userName: string,
    legalName: string,
    role: Array<string>,
    email: string
}

export default async function handler(req, res) {
    var data: any = "";
    try {
        if (req.method === 'POST') {
            data = await Pipe(validate(postSchema), createPostParams, putItem, checkError,)(req.body);
        } else if (req.method === "GET") {
            req.query.userID = Number(req.query.userID)
            data = await Pipe(validate(getSchema), createGetParams, getUser, createDefaultUserIfUndefined)(req.query)
        } else if (req.method === "PATCH") {

        } else if (req.method === "DELETE") {
            data = await Pipe(validate(deleteSchema), createDeleteParams, deleteItem)(req.body)
        } else {
            return res.status(400).json({ msg: "bad request" })
        }
        console.log(data)
        return res.status(200).json({ ...data })
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ err: JSON.stringify(error.message) });
    }
}

function createPostParams(param: POSTBody) {
    const params: PutItemCommandInput = {
        TableName: process.env.DB_USER_TABLENAME || tableName,
        Item: {
            userID: { S: `${param.userID}` },
            legalName: { S: param.legalName },
            userName: { S: param.userName || "" },
            clubs: { S: JSON.stringify(param.clubs) || "" },
            tasks: { S: JSON.stringify(param.tasks) || "" },
            role: { S: JSON.stringify(param.role) || "" },
            email: { S: JSON.stringify(param.email) || "" }
        },
        ConditionExpression: 'attribute_not_exists(userID)' //throws: ConditionalCheckFailedException if userID is already exist
    };
    return params
}



function createGetParams(param: GETQuery) {
    return {
        data: param,
        returnedValue: {
            TableName: process.env.DB_USER_TABLENAME || tableName,
            Key: {
                userID: {
                    S: `${param.userID}`
                }
            },
        }
    }
}

async function createDefaultUserIfUndefined(param) {
    var res = await param.returnedValue;
    if (res.Item) { return res }

    //create user: 
    var postResponse = Pipe(generateDefaultUser, validate(postSchema), createPostParams, putItem)(param.data)

    return postResponse;
}


function generateDefaultUser(param: userType) {
    return {
        userID: param.userID,
        clubs: [],
        tasks: [],
        userName: param.legalName,
        legalName: param.legalName,
        role: [
            "member"
        ],
        email: param.email,
    }
}

function getUser(param) {
    return { data: param.data, returnedValue: getItem(param.returnedValue) }
}


async function checkError(param) {
    var params = await param
    let err = params.err

    if (!err) return param;

    if (err === "ConditionalCheckFailedException") {
        return { err: "ConditionalCheckFailedException. api/user POST:  ConditionExpression: 'attribute_not_exists(userID)' " }
    }

    console.error("unhandled err....", err)
    return param;
}


function createDeleteParams(param) {
    return {
        TableName: process.env.DB_CLUB_USER_TABLENAME || tableName,
        Key: {
            userID: { S: `${param.userID}` },
        },
    };

}