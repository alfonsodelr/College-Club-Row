import { getItem } from "../../../../libs/ddb_getitem";
import { putItem } from "../../../../libs/ddb_putitem";
import { updateItem } from "../../../../libs/ddb_updateitem";
import { deleteItem } from "../../../../libs/ddb_deleteitem"
import { GetItemCommandInput, PutItemCommandInput, UpdateItemCommandInput, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ajv } from "../../../utils/validation"


const validatePost = ajv.getSchema("api_club_post_schema");
const validateGet = ajv.getSchema("api_club_get_schema");


export default async function handler(req, res) {
    var data: any = "";
    try {
        if (req.method === 'POST') {
            if (!validatePost(req.body)) throw new Error("api/club/index.ts --post: invalid Param");
            const { clubID, clubName } = req.body;
            const formID = req.body.formID || "";
            const params: PutItemCommandInput = {
                TableName: process.env.DB_CLUB_TABLENAME,
                Item: {
                    clubID: { S: clubID },
                    clubName: { S: clubName },
                    formID: { S: formID },
                }
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

        } else if (req.method === "DELETE") {

        } else {
            return res.status(400).json({ msg: "bad request" })
        }

        return res.status(data['$metadata'].httpStatusCode).json({ ...data })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ msg: JSON.stringify(error) });
    }
}
