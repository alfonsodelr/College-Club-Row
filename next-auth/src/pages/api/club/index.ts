import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { updateItem } from "../../../../libs/ddb_updateitem";
import { deleteItem } from "../../../../libs/ddb_deleteitem"
import { GetItemCommandInput, PutItemCommandInput, UpdateItemCommandInput, ScanCommandInput, ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ValidateFunction } from "ajv";
import { errorHandler, Pipe, Tap, validateRole, validateSchema } from "../../../utils/helper";
import cookies from "../../../utils/cookies.js"
import { scanTable } from "../../../../libs/ddb_scantable"
const validatePost = ajv.getSchema("api_club_post_schema");
const validateGet = ajv.getSchema("api_club_get_schema");
const patchSchema = ajv.getSchema("api_club_patch_schema");

//TODO: should only use validateSchema helper function via Pipe().!!!!! clean up
const validate = (fn: ValidateFunction) => (data: Object) => { if (!fn(data)) throw new Error("api/club/: Invalid_Param"); return data }


async function handler(req, res) {
    var data: any = "";
    try {
        if (req.method === 'POST') {

            if (!validatePost(req.body)) throw new Error("api/club/index.ts --post: invalid Param");
            if (!req.body.status) req.body.status = 1;
            if (!req.body.term) req.body.term = { year: '2022', semester: 'spring' };
            data = marshall(req.body);
            const params: PutItemCommandInput = {
                TableName: process.env.DB_CLUB_TABLENAME,
                Item: { ...data }
            };
            data = await putItem(params)
        } else if (req.method === "GET") {
            if (req.query.clubID === 'all') {
                data = await Pipe(createParams_getAll, scanTable)();
                // console.log(data.header())

                delete data.params;
                data.Items = data.Items.map(item => unmarshall(item));
            } else {
                data = await Pipe(validateSchema(validateGet), generateParams_get, getCLub)(req.query)
                if (data?.Item) {
                    res.cookie('club1', `${data.Item}`)// { httpOnly: true, secure: process.env.NEXT_PUBLIC_NODE_ENV !== 'dev', sameSite: 'strict', path: "/club" }
                    // data.Items = await data.Items.map(item => unmarshall(item))
                    delete data.params;
                }
            }

        } else if (req.method === "PATCH") {
            data = await Pipe(validate(patchSchema), generateUpdateParam, updateClub)(req.body)

        } else if (req.method === "DELETE") {


        } else {
            return res.status(400).json({ msg: "bad request" })
        }
        return res.status(200).json({ ...data })
        // return res.status(data['$metadata'].httpStatusCode).json({ ...data })
    } catch (error) {
        let err = errorHandler(req, error);
        return res.status(404).json({ error: err });
    }
}


export default cookies(handler)


function generateUpdateParam(body) {
    let dataAction = body.action;

    if (dataAction === "append_role") {
        let dataKey = body.key; //role to update
        let dataValue = body.value;//id of the user who will get the role
        let userRole = validateRole(body.key.slice(0, -1))

        const club_params: UpdateItemCommandInput = {
            TableName: process.env.DB_CLUB_TABLENAME,
            Key: {
                clubID: { S: body.clubID },
            },
            UpdateExpression: `SET #key = list_append(#key, :i)`,
            ConditionExpression: "attribute_not_exists(#key) OR NOT contains(#key, :ii)",
            ExpressionAttributeNames: { "#key": `${dataKey}` },
            ExpressionAttributeValues: {
                ":i": {
                    "L": [
                        { "S": `${dataValue}` },
                    ]
                },
                ":ii": {
                    "S": `${dataValue}`
                }
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

        return { ...body, club_params, user_params };
    } else if (dataAction === 'update') {
        let dataKey = body.key;
        let dataValue = body.value;
        let clubID = body.clubID
        const params: UpdateItemCommandInput = {
            TableName: process.env.DB_CLUB_TABLENAME,
            Key: {
                clubID: { S: clubID },
            },
            UpdateExpression: `set #key = :i`,
            ExpressionAttributeNames: { "#key": `${dataKey}` },
            ExpressionAttributeValues: {
                ":i": { S: dataValue },
            },
        };

        return { ...body, params };
    }

    throw new Error("api/club generateUpdateParam action not found");
}

async function updateClub(body) {
    if (body.action === "append_role") {
        var clubResponse = await updateItem(body.club_params);
        if (clubResponse.error !== undefined) {
            throw Error("api/club Update append_role action clubResponse error: " + clubResponse.error);
        }

        var userResponse = await updateItem(body.user_params);
        if (userResponse.error !== undefined) {
            throw Error("api/club Update append_role action userResponse error: " + userResponse.error);
        }

        if (clubResponse['$metadata']?.httpStatusCode === 200 && userResponse['$metadata']?.httpStatusCode === 200) {
            delete body.club_params;
            delete body.user_params;
            return { ...body, clubResponse: clubResponse['$metadata'], userResponse: userResponse['$metadata'] }
        }
        throw new Error("api/club Update append_role action response status != 200.\n" + clubResponse.error + userResponse.error);

    } else if (body.action === "update") {
        var updateResponse = await updateItem(body.params);
        if (updateResponse['$metadata']?.httpStatusCode === 200) {
            delete body?.params;
            delete updateResponse?.params
            return { ...body, updateResponse }
        }
        throw new Error("api/club Update update action response status != 200.\n" + updateResponse);
    }
    throw new Error("api/club UPdate action not found");
}


function createParams_getAll() {
    var params = {
        TableName: process.env.DB_CLUB_TABLENAME,
        ProjectionExpression: "#clubID, #formID, #image, #purpose, #clubName",
        FilterExpression: "#formID <> :empty and #formID <> :empty2",
        ExpressionAttributeNames: {
            "#formID": "formID",
            "#image": "image",
            "#purpose": "purpose",
            "#clubName": "clubName",
            "#clubID": "clubID"
        },
        ExpressionAttributeValues: {
            ":empty": { S: "" },
            ":empty2": { S: " " },
        }
    };
    return params;
}

function generateParams_get(query) {
    const params: GetItemCommandInput = {
        TableName: process.env.DB_CLUB_TABLENAME,
        Key: {
            clubID: {
                S: query.clubID
            }
        },
    }
    return { params, ...query };
}

function getCLub(query) {
    return getItem(query.params)
}
