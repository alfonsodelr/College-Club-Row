import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { updateItem } from "../../../../libs/ddb_updateitem";
import { deleteItem } from "../../../../libs/ddb_deleteitem"
import { GetItemCommandInput, PutItemCommandInput, UpdateItemCommandInput, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { errorHandler, Pipe, Tap, validateSchema } from "../../../utils/helper";
import { scanTable } from "../../../../libs/ddb_scantable";


interface postBodyType {
    clubID: string,
    formID: string,
    tags: Array<object>
}

interface getBodyType {
    clubID: string,
    formID: string,
}


const validateGet = ajv.getSchema("api_form_get_schema")
const validatePost = ajv.getSchema("api_form_post_schema")
const validatePatch = ajv.getSchema("api_form_patch_schema")
const validateDelete = ajv.getSchema("api_form_delete_schema")

export default async function handler(req, res) {
    var data: any;
    try {
        if (req.method === 'POST') {
            let body: postBodyType = req.body;
            data = await Pipe(validateSchema(validatePost), createPostParams, posForm)(body)

        } else if (req.method === "GET") {
            let body: getBodyType = req.query;

            if (body.clubID === 'all' && body.formID === 'all') {
                //getAll() for club_form shuould only return {clubID} and {formID}  
                data = await Pipe(createParams_getAll, scanTable)();
            } else {
                data = await Pipe(validateSchema(validateGet), createGetParams, getForm)(body);
            }

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
        let ddbStatus = data['$metadata']?.httpStatusCode;
        return res.status(ddbStatus !== undefined ? ddbStatus : 204).json({ ...data })
    } catch (error) {
        return res.status(404).json({ error: errorHandler(req, error) });
    }
}





/*!
 * @desc  generates ddb PutItemCommandInput for api/form POST
 * @param  {body} {...req.body}   
 * @return {...body, params} 
 */
function createPostParams(body) {
    const params: PutItemCommandInput = {
        TableName: process.env.DB_CLUB_FORM_TABLENAME,
        Item: { ...marshall(body) }
    };

    return { ...body, params }
}


/*!
 * @desc  calls ddb_putItem for api/form POST.
 * @param  {body} {...req.body, params}   
 * @return {clubID, formID, $metadata} 
 */
async function posForm(body) {
    var dbResponse = await putItem(body.params);
    if (dbResponse['$metadata'] !== undefined) body['$metadata'] = dbResponse['$metadata']
    delete body.params;
    delete body.tags;
    return { ...body, }
}



/*!
 * @desc  generates ddb PutItemCommandInput for api/form GET
 * @param  {body} {...req.body}   
 * @return {...body, params} 
 */
function createGetParams(body) {
    const params: GetItemCommandInput = {
        TableName: process.env.DB_CLUB_FORM_TABLENAME,
        Key: { ...marshall(body) }
    }
    return { ...body, params }
}


/*!
 * @desc  calls ddb_getItem for api/form GET.
 * @param  {body} {...req.body, params}   
 * @return {clubID, formID, $metadata, Item} 
 */
async function getForm(body) {
    var dbResponse: any = await getItem(body.params);
    body['$metadata'] = dbResponse['$metadata'];
    body.Item = dbResponse.Item !== undefined ? unmarshall(dbResponse.Item) : "Item not found.";
    delete body.params;
    return { ...body }
}



/*!
 * @desc  creates params for scanTable();
 * @param  {}    
 * @return {ScanCommandOutput} 
 */
function createParams_getAll() {
    var params = {
        TableName: process.env.DB_CLUB_FORM_TABLENAME,
        ProjectionExpression: "#clubID, #formID",
        ExpressionAttributeNames: {
            "#formID": "formID",
            "#clubID": "clubID"
        }
    };
    return params;
}
