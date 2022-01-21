import { getItem } from "../../../libs/ddb_getitem";
import { GetItemCommandInput, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { putItem } from "../../../libs/ddb_putitem";
// import ajv from "../../../src/validation"


interface GET_Body {
    key: {
        clubID: {
            S: string,
        },
        formID: {
            S: string,
        }
    }
}
type POST_Body = {
    Item: {
        clubID: { S: string },
        formID: { S: string },
    }
}

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const item = req.body.Item;


            const params: PutItemCommandInput = {
                TableName: process.env.DB_CLUB_FORM_TABLENAME,
                Item: item,
            };
            const data = await putItem(params)
            return res.status(200).json({ msg: data })

        } else if (req.method === "GET") {
            const key = req.body.Key;
            // let schema = ajv.getSchema('getItemSchema');
            // if (!schema(key)) throw Error('{ msg: "form/get: param error" }')

            const params: GetItemCommandInput = {
                TableName: process.env.DB_CLUB_FORM_TABLENAME,
                Key: req.body.Key,
            }
            const data = await getItem(params);
            return res.status(200).json({ data: data })

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

