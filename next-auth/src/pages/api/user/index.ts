/*-----------------TODO---------------------


*/
import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { deleteItem } from "../../../../libs/ddb_deleteitem";
import { PutItemCommandInput, } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"
import { ValidateFunction } from 'ajv'
import { Pipe, Tap, generateDefaultUser, userType } from "../../../utils/helper";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";


const tableName = process.env.DB_USER_TABLENAME;
const postSchema = ajv.getSchema("api_user_post_schema");
const getSchema = ajv.getSchema("api_user_get_schema");
const deleteSchema = ajv.getSchema("api_user_delete_schema")
const validate = (fn: ValidateFunction) => (data: Object) => { if (!fn(data)) throw new Error("api/user: Invalid_Param"); return data }


export default async function handler(req, res) {
    var data: any = "";
    try {
        if (req.method === 'POST') {
            data = await Pipe(validate(postSchema), createPostParams, putItem, checkError,)(req.body);
        } else if (req.method === "GET") {
            data = await Pipe(validate(getSchema), getUser)(req.query)
            if (!data.Item) {
                data = await Pipe(generateDefaultUser, validate(postSchema), createPostParams, putItem, checkError,)(req.query);
                data.Item = unmarshall(data.params.Item)
            }
        } else if (req.method === "PATCH") {

        } else if (req.method === "DELETE") {
            data = await Pipe(validate(deleteSchema), createDeleteParams, deleteItem)(req.body)
        } else {
            return res.status(400).json({ msg: "bad request" })
        }
        // console.log(data)
        return res.status(200).json({ ...data })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ err: JSON.stringify(error.message) });
    }
}

function createPostParams(param: userType) {
    const params: PutItemCommandInput = {
        TableName: process.env.DB_USER_TABLENAME || tableName,
        Item: marshall({ ...param }),
        ConditionExpression: 'attribute_not_exists(userID)' //throws: ConditionalCheckFailedException if userID is already exist
    };
    return params
}


async function getUser(param) {
    const params = {
        TableName: process.env.DB_USER_TABLENAME || tableName,
        Key: {
            userID: {
                S: `${param.userID}`
            }
        },
    }
    const GETResponse = await getItem(params);
    return { param, ...GETResponse }
}


async function checkError(param) {
    var params = await param
    var err = params.error
    if (!err) return param;

    if (err.message === "The conditional request failed") {
        return { err: "ConditionalCheckFailedException. api/user POST:  ConditionExpression: 'attribute_not_exists(userID)' " }
    } else if (err.message === "No value defined: {}") {
        console.log("user doesn't exist. creating default user.");
        return param;
    }
    else {
        throw new Error(`unexpepcted error api/user/post: ${err.stack}`);
    }
}

//comment: this function can be replaced by unmarshell from @aws-sdk/util-dynamodb
function createDeleteParams(param) {
    return {
        TableName: process.env.DB_CLUB_USER_TABLENAME || tableName,
        Key: {
            userID: { S: `${param.userID}` },
        },
    };

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