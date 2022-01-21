
// Import required AWS SDK clients and commands for Node.js
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient";
// // Set the parameters
// export const params = {
//   TableName: "TABLE_NAME",
//   Item: {
//     CUSTOMER_ID: { N: "001" },
//     CUSTOMER_NAME: { S: "Richard Roe" },
//   },
// };

// const params = {
//     TableName: process.env.DB_CLUB_FORM_TABLENAME,
//     Item: {
//         clubID: { S: "CLUB123" },
//         formID: { S: "FORM123" },
//         tags: { S: "asdfasdfasdf" }
//     },
// };

const putItem = async (params) => {

    try {
        if (!params.TableName || !params.Item) {
            throw Error({ msg: "ddb_putItem: missing params" })
        }
        const data = await ddbClient.send(new PutItemCommand(params));
        console.log("ddb_putitem: ", data);
        return data;
    } catch (err) {
        console.error(err);
    }
};

export { putItem }