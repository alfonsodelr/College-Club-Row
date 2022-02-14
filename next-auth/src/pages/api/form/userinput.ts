/*-----------------TODO---------------------


*/
import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { deleteItem } from "../../../../libs/ddb_deleteitem";
import { GetItemCommandInput, PutItemCommandInput, } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"
import { errorHandler, Pipe, Tap, validateSchema } from "../../../utils/helper";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";


// const tableName = process.env.DB_USER_TABLENAME;
const postSchema = ajv.getSchema("api_form_userinput_post_schema");
const getSchema = ajv.getSchema("api_form_userinput_get_schema");
// const deleteSchema = ajv.getSchema("api_user_delete_schema")

export default async function handler(req, res) {
    var data: any = "";
    try {
        if (req.method === 'POST') {
            data = await Pipe(validateSchema(postSchema), createPostParams, postUserInput)(req.body);
        } else if (req.method === "GET") {
            data = await Pipe(validateSchema(getSchema), createGetParams, getUserInput)(req.query)
        } else if (req.method === "PATCH") {
            return res.status(204).end();

        } else if (req.method === "DELETE") {
            return res.status(204).end();
        } else {
            return res.status(204).end();
        }
        let ddbStatus = data['$metadata']?.httpStatusCode;
        return res.status(ddbStatus !== undefined ? ddbStatus : 204).json({ ...data })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: errorHandler(req, error) });
    }
}



//!!!!!comment: should make a helper function for createParams, postItem/getItem... on all api routes. hint: pass the whole rq to the Pipe().
function createPostParams(body) {
    const params: PutItemCommandInput = {
        TableName: process.env.DB_USER_FORM_TABLENAME,
        Item: { ...marshall(body) }
    };

    return { ...body, params }
}

async function postUserInput(body) {
    var dbResponse = await putItem(body.params)
    delete dbResponse.params;
    return { ...dbResponse }
}

function createGetParams(query) {
    const params: GetItemCommandInput = {
        TableName: process.env.DB_USER_FORM_TABLENAME,
        Key: { ...marshall(query) }
    };
    return { ...query, params }
}

async function getUserInput(query) {
    var dbResponse: any = await getItem(query.params);
    query['$metadata'] = dbResponse['$metadata'];
    query.Item = dbResponse.Item !== undefined ? unmarshall(dbResponse.Item) : "Item not found.";
    delete query.params;
    return { ...query }
}

