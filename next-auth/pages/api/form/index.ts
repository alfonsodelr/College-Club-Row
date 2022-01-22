import { getItem } from "../../../libs/ddb_getitem";
import { putItem } from "../../../libs/ddb_putitem";
import { GetItemCommandInput, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
// import { ajv } from "../../../src/validation"
import { ajv } from "../../../src/validation"



const validateGet = ajv.getSchema("api_form_get_schema")

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            // const item = req.body.Item;
            // const params: PutItemCommandInput = {
            //     TableName: process.env.DB_CLUB_FORM_TABLENAME,
            //     Item: item,
            // };
            // const data = await putItem(params)
            return res.status(200).json({ msg: "data" })

        } else if (req.method === "GET") {
            if (!validateGet(req.body)) throw new Error("api/form/index.ts --get: Invalid Param");
            const params: GetItemCommandInput = {
                TableName: process.env.DB_CLUB_FORM_TABLENAME,
                Key: req.body.Key,
            }
            const data = await getItem(params);
            return res.status(200).json({ data: "" })
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({ msg: JSON.stringify(error) });
    }
}

//sample get getitem params: 
// {
//     "Key": {
//       "clubID": {
//         "S": "CLUB1232"
//       },
//       "formID": {
//         "S": "FORM1232"
//       }
//     }
//   }

//sample post putItem params: 
// const params = {
//     TableName: "CCR-club-form",
//     Item: {
//         clubID: { S: "CLUB1232" },
//         formID: { S: "FORM1232" },
//         tags: { S: "asdfasdfasdf" },
//         tags2: { S: "asdfasdfasdf" },
//         tags3: { N: "3354" },
//     },
// };

